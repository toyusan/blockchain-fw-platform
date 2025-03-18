Blockchain Firmware Platform
============================

Plataforma baseada em blockchain para atualização segura de firmware de dispositivos IoT.\
Este repositório contém os contratos inteligentes, interfaces de comunicação, firmware de referência e documentação necessários para validar a solução proposta.

Visão Geral
-----------

Este projeto faz parte da dissertação de mestrado e propõe uma arquitetura descentralizada para a distribuição segura de firmware em dispositivos IoT, utilizando blockchain e IPFS. A solução visa garantir:

-   **Integridade** -- Verificação da autenticidade do firmware através de hashes registrados na blockchain.
-   **Autenticidade** -- Apenas versões autorizadas do firmware podem ser instaladas.
-   **Distribuição Segura** -- Uso de IPFS para armazenar e distribuir os firmwares de forma descentralizada.

Estrutura do Repositório
------------------------

O repositório está organizado da seguinte forma:

-   **contracts/** -- Código dos contratos inteligentes.
-   **interface/** -- Código da API e interfaces de comunicação.
-   **firmware/** -- Firmware de referência para dispositivos IoT.
-   **scripts/** -- Scripts auxiliares para deploy e interação.
-   **README.md** -- Documentação principal do repositório.
-   **.gitignore** -- Arquivos ignorados pelo Git.
-   **LICENSE** -- Licença do projeto.

Requisitos
----------

Antes de utilizar o projeto, certifique-se de ter instalado:

-   Node.js - Para executar scripts e interagir com os contratos.
-   Hardhat - Para desenvolvimento e testes dos contratos inteligentes.
-   IPFS - Para armazenamento distribuído.
-   Docker - Caso utilize um nó blockchain em container.
-   Ferramentas para ESP32 - Caso utilize o firmware.

Como Configurar
---------------

1.  Clone este repositório:

    git clone <https://github.com/seu-usuario/blockchain-fw-platform.git>\
    cd blockchain-fw-platform

2.  Instale as dependências:

    cd contracts\
    npm install

3.  Inicie a blockchain local (se necessário):

    npx hardhat node

4.  Implante os contratos:

    npx hardhat run scripts/deploy.js --network localhost

Documentação
------------

A documentação completa pode ser encontrada na pasta `docs/`.

Contribuição
------------

Caso queira contribuir, fique à vontade para abrir issues e pull requests!