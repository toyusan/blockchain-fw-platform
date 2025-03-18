🌐 Interface -- Blockchain Firmware Platform
===========================================

Esta pasta contém a **interface de comunicação** responsável por conectar os dispositivos IoT à blockchain. A interface foi implementada como um **servidor HTTPS** que interage com os contratos inteligentes para verificar atualizações de firmware e registrar estatísticas de atualização.

📂 Estrutura
------------

-   **serverInterface.js** -- Servidor HTTPS que recebe requisições de dispositivos IoT e interage com os contratos inteligentes na blockchain.

⚡ Funcionalidades
-----------------

A interface fornece dois endpoints principais:

### 1️⃣ **Verificação de Atualização (`/register-device`)**

Os dispositivos enviam sua versão de hardware e software para verificar se há uma nova atualização disponível.

**Exemplo de requisição (JSON enviado pelo dispositivo):**

json

CopiarEditar

`{
  "hardwareVersion": "Model-2.0",
  "softwareVersion": "v1.1"
}`

**Respostas possíveis:**

-   `200 OK: No update needed` → O dispositivo já está atualizado.
-   `200 OK + JSON` → Uma nova versão está disponível (detalhes no JSON de resposta).
-   `404 ERROR: Hardware version not found` → O hardware não está registrado na blockchain.

### 2️⃣ **Registro de Atualização (`/report-update`)**

Os dispositivos informam o resultado da tentativa de atualização.

**Exemplo de requisição (JSON enviado pelo dispositivo):**

json

CopiarEditar

`{
  "hardwareVersion": "Model-2.0",
  "versionIndex": 1,
  "updateResult": "success"
}`

**Respostas possíveis:**

-   `200 OK: Update success recorded` → A atualização foi registrada como bem-sucedida.
-   `200 OK: Update failure recorded` → A atualização falhou e foi registrada.
-   `500 Internal Server Error` → Algum problema ocorreu na execução da transação na blockchain.

🛠️ Como Executar a Interface
-----------------------------

1️⃣ **Instale as dependências necessárias:**

bash

CopiarEditar

`npm install web3 https fs`

2️⃣ **Certifique-se de que a blockchain local está rodando:**

bash

CopiarEditar

`npx hardhat node`

3️⃣ **Inicie o servidor:**

bash

CopiarEditar

`node interface/serverInterface.js`

4️⃣ **O servidor estará disponível na porta 3000** e aceitará requisições HTTPS.

🔍 Observações
--------------

-   O servidor utiliza **certificados TLS** para garantir comunicação segura.
-   Certifique-se de substituir os **endereços dos contratos** no código para refletir os contratos implantados em sua rede.
-   A chave privada no código deve ser protegida e nunca ser exposta publicamente.

📄 Documentação
---------------

Os detalhes completos da interface podem ser encontrados no arquivo `serverInterface.js`.