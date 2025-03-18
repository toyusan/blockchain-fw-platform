📜 Contratos Inteligentes -- Blockchain Firmware Platform
========================================================

Esta pasta contém os **contratos inteligentes** que implementam a lógica da atualização segura de firmware via blockchain. Cada contrato possui um papel específico dentro do sistema.

📂 Estrutura dos Contratos
--------------------------

-   **FirmwareUpdateChecker.sol** -- Responsável por verificar a versão do firmware disponível para um determinado dispositivo.
-   **FirmwareRegistry.sol** -- Registra e gerencia as versões de firmware aprovadas, armazenando seus metadados na blockchain.
-   **FirmwareUpdateStats.sol** -- Mantém estatísticas sobre o processo de atualização, como número de dispositivos atualizados e falhas reportadas.

🛠️ Como Usar
-------------

1️⃣ **Compilar os contratos:**

`npx hardhat compile`

2️⃣ **Implantar os contratos na blockchain local:**

`npx hardhat run scripts/deploy.js --network localhost`

3️⃣ **Interagir com os contratos (exemplo usando Hardhat Console):**


`npx hardhat console --network localhost`

No console interativo, você pode chamar funções dos contratos, por exemplo:


`const FirmwareRegistry = await ethers.getContractFactory("FirmwareRegistry");
const registry = await FirmwareRegistry.attach("ENDEREÇO_DO_CONTRATO");
await registry.getLatestFirmwareVersion("DEVICE_ID");`


📄 Documentação
---------------

Os detalhes sobre cada contrato, suas funções e eventos podem ser encontrados nos arquivos `.sol` dentro desta pasta.