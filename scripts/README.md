📜 Scripts -- Blockchain Firmware Platform
=========================================

Esta pasta contém scripts para testar e interagir com os contratos inteligentes da plataforma **Blockchain Firmware Platform**. Os scripts utilizam **Hardhat** e **Ethers.js** para facilitar a execução de operações nos contratos.

📂 Estrutura dos Scripts
------------------------

-   **interactFirmwareUpdateChecker.js** -- Consulta a blockchain para verificar a versão mais recente disponível do firmware para um determinado modelo de hardware.
-   **interactFirmwareUpdateStats.js** -- Registra estatísticas sobre atualizações de firmware bem-sucedidas e falhas, além de consultar esses dados.
-   **interactFirmwareRegistry.js** -- Registra novas versões de firmware na blockchain e recupera informações sobre versões armazenadas.

🛠️ Como Usar os Scripts
------------------------

Antes de executar os scripts, certifique-se de que:\
✅ O **Node.js** está instalado.\
✅ O **Hardhat** está configurado e os contratos foram implantados.\
✅ A blockchain local está rodando (`npx hardhat node`).

### 1️⃣ Executando o script de verificação de firmware

bash

CopiarEditar

`node scripts/interactFirmwareUpdateChecker.js`

### 2️⃣ Executando o script de estatísticas de atualização

bash

CopiarEditar

`node scripts/interactFirmwareUpdateStats.js`

### 3️⃣ Executando o script de registro de firmware

bash

CopiarEditar

`node scripts/interactFirmwareRegistry.js`

🔍 Observações
--------------

-   Cada script deve ser executado dentro do diretório raiz do projeto (`blockchain-fw-platform/`).
-   Certifique-se de que os contratos inteligentes estão implantados corretamente antes de rodar os scripts.
-   Caso necessário, modifique os **endereços dos contratos** dentro dos scripts para corresponderem aos contratos implantados na sua rede.

📄 Documentação
---------------

Os detalhes sobre os contratos e suas funções podem ser encontrados na pasta `contracts/`.