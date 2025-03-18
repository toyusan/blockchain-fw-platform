const { Web3 } = require('web3');
const https = require('https');
const fs = require('fs');

// Carregar o ABI dos contratos
const firmwareUpdateCheckerABI = require('/home/ec2-user/MyHardhatProject/artifacts/contracts/FirmwareUpdateChecker.sol/FirmwareUpdateChecker.json').abi;
const firmwareUpdateStatsABI = require('/home/ec2-user/MyHardhatProject/artifacts/contracts/FirmwareUpdateStats.sol/FirmwareUpdateStats.json').abi;

// Conexão com a blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Substitua pela chave privada real do remetente da transação
const privateKey = '0xaca9af126701bdd25c9d959217dfd93fb5cb7792f91a37f7b7c675d655852648';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const firmwareUpdateCheckerAddress = '0xCEa7e4923FA1b63F4a6ce7319bBa194c0F93Cd62';
const firmwareUpdateStatsAddress = '0x6E1cbdA9dbE6833095344d5529fA7eBeCdfa8504'; // Substitua pelo endereço correto do contrato FirmwareUpdateStats

// Instâncias dos contratos
const firmwareUpdateChecker = new web3.eth.Contract(firmwareUpdateCheckerABI, firmwareUpdateCheckerAddress);
const firmwareUpdateStats = new web3.eth.Contract(firmwareUpdateStatsABI, firmwareUpdateStatsAddress);

// Opções de configuração para HTTPS
const options = {
  key: fs.readFileSync('/home/ec2-user/certificados/server-key.pem'),
  cert: fs.readFileSync('/home/ec2-user/certificados/server-cert.pem'),
  ca: fs.readFileSync('/home/ec2-user/certificados/ca-cert.pem'),
  requestCert: true,
  rejectUnauthorized: true
};

// Criar o servidor HTTPS
https.createServer(options, async (req, res) => {
  if (req.client.authorized) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        if (req.url === '/register-device') {
          const hardwareVersion = data.hardwareVersion;
          const softwareVersion = data.softwareVersion;

          // Verificar a última versão de firmware para o hardware específico
          const latestFirmware = await firmwareUpdateChecker.methods.checkForUpdates(hardwareVersion).call();
          if (!latestFirmware.version) {
            res.writeHead(404);
            res.end('ERROR: Hardware version not found');
          } else if (latestFirmware.version === softwareVersion) {
            res.writeHead(200);
            res.end('OK: No update needed');
          } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
              message: 'Update available',
              latestFirmware: latestFirmware
            }));
          }
        } else if (req.url === '/report-update') {
          const hardwareVersion = data.hardwareVersion;
          const versionIndex = data.versionIndex;
          const updateResult = data.updateResult;

          const txData = updateResult === 'success' ?
            firmwareUpdateStats.methods.recordUpdateSuccess(hardwareVersion, versionIndex).encodeABI() :
            firmwareUpdateStats.methods.recordUpdateFailure(hardwareVersion, versionIndex).encodeABI();

          const tx = {
            from: account.address,
            to: firmwareUpdateStatsAddress,
            data: txData,
            gas: '2000000',
            gasPrice: '0'
          };

          const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
          const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

          res.writeHead(200);
          res.end(`Update ${updateResult} recorded: ${receipt.transactionHash}`);
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    });
  } else {
    res.writeHead(401);
    res.end('Unauthorized');
  }
}).listen(3000, () => {
  console.log('Server running on port 3000');
});
