# **Find A Friend**

**Find A Friend** é uma plataforma fullstack para adoção de pets, criada para conectar ONGs e abrigos a pessoas que desejam adotar. A aplicação simplifica o processo de adoção, permitindo o cadastro de pets e organizações, listagem por cidade, filtragem por características e contato direto via WhatsApp, promovendo a adoção responsável e reduzindo o abandono animal.

---

## Índice

- [Introdução](#introdução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Testes](#testes)
- [Regras de Negócio e Requisitos](#regras-de-negócio-e-requisitos)
- [Documentação](#documentação)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Como Contribuir](#como-contribuir)
- [Contato](#contato)

---

## Introdução

O problema do abandono de animais e a dificuldade que ONGs e abrigos enfrentam para encontrar lares para os pets é um desafio global. A falta de uma plataforma centralizada e de fácil acesso para a divulgação de animais para adoção e para o contato entre as partes interessadas agrava essa situação.

**Find A Friend** surge como a solução para este problema, oferecendo uma ferramenta intuitiva e eficiente que centraliza o processo de adoção, desde o cadastro dos pets e suas características até a facilitação do contato direto entre a ONG e o interessado, garantindo um processo ágil e seguro.

---

## Tecnologias Utilizadas

### **Frontend**

- **Vite**: Ferramenta de build de frontend moderna e rápida.
- **React**: Biblioteca JavaScript para a construção de interfaces de usuário reativas e componentizadas.
- **TailwindCSS**: Framework CSS que acelera o desenvolvimento com classes utilitárias para estilização.
- **Radix UI**: Biblioteca de componentes de UI sem estilos, focada em acessibilidade e flexibilidade.
- **Axios**: Cliente HTTP baseado em Promessas para fazer requisições à API.
- **Zod**: Biblioteca de validação de esquemas que garante a integridade dos dados nos formulários.

### **Backend**

- **Node.js**: Ambiente de execução JavaScript para o desenvolvimento da API.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática e melhora a manutenibilidade do código.
- **Fastify**: Framework web de alta performance para Node.js, otimizado para a construção de APIs.
- **Docker**: Plataforma para empacotar a aplicação e suas dependências em contêineres, garantindo portabilidade e consistência.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional robusto e escalável.
- **Swagger**: Ferramenta utilizada para gerar a documentação interativa da API.
- **Cloudinary**: Serviço de gerenciamento de imagens na nuvem, utilizado para hospedar as fotos dos pets.

Para garantir a escalabilidade e a manutenibilidade do código, a arquitetura do backend foi construída seguindo os princípios **SOLID** e utilizando padrões de projeto como **Factory Pattern** e **Repository Pattern**.

### **Testes**

A qualidade e a robustez do projeto foram garantidas através de uma abordagem de testes abrangente, incluindo:
- **Testes Unitários e E2E (Backend)**: Utilizando **Vitest** para testar as funcionalidades da API.
- **Testes E2E (Frontend)**: Utilizando **Cypress** para simular o comportamento do usuário e garantir que a interface funcione como esperado.

---

## Regras de Negócio e Requisitos

Este projeto foi construído com base nos seguintes requisitos e regras:

### **Requisitos Funcionais (RFs)**
- Cadastro e login para ORGs.
- Cadastro e visualização de detalhes de pets.
- Adição de fotos dos pets.
- Listagem e filtragem de pets disponíveis por cidade e características.
- Contato direto com a ORG via WhatsApp.

### **Regras de Negócio (RNs)**
- Uma ORG precisa estar autenticada para gerenciar seus pets.
- A cidade é um campo obrigatório para a listagem de pets.
- Todos os pets são vinculados a uma ORG.
- Um pet pode ter status "disponível" ou "adotado".
- A senha do usuário deve ser criptografada.

### **Requisitos Não-Funcionais (RNFs)**
- O usuário é identificado por um JSON Web Token (JWT).
- Todas as listas de dados são paginadas (20 itens por página).
- Os dados são persistidos em um banco de dados PostgreSQL.
- A API implementa Rate Limiting para evitar abusos.

---

## Documentação

A documentação completa da API foi gerada com **Swagger**. Nela, você pode encontrar todos os detalhes dos endpoints, modelos de dados, exemplos de uso e respostas esperadas.

**Acesse a documentação aqui**: [Find A Friend API Docs](https://find-a-friend-d1qv.onrender.com/docs)

---

## Instalação

### **Pré-requisitos**
Certifique-se de que você tenha instalado:
- `Git`
- `Node.js` e `npm` (ou `yarn`)
- `Docker` e `Docker Compose`

### **Passos**

1. **Clone o repositório**:
   ```bash
   git clone [https://github.com/vandilsonbrito/find-a-friend.git](https://github.com/vandilsonbrito/find-a-friend.git)
   ```

2. **Navegue para o repositório:**
   ```bash
   cd find-a-friend
   ```

3. **Configuração e Instalação do Backend**:
   - Navegue até a pasta do backend:
    ```bash
    cd Backend
    ```
   - Crie um arquivo `.env` com base no `.env.example` e preencha com suas credenciais (por exemplo, PostgreSQL e Cloudinary).
   - Suba o banco de dados com Docker Compose:
    ```bash
    docker-compose up -d
    ```
   - Instale as dependências:
    ```bash
    npm install
    ```
   - Execute as migrações do banco de dados:
    ```bash
    npm run prisma:migrate
    ```
   - Execute o seed do banco de dados:
    ```bash
    npx prisma db seed
    ```

4. **Configuração e Instalação do Frontend**:
   - Navegue até a pasta do frontend:
    ```bash
    cd Frontend
    ```
   - Instale as dependências:
    ```bash
    npm install
    ```

---

## Executando a Aplicação

- **Para executar o Backend**:
1. Navegue até o diretório do backend (`cd Backend`).
2. Inicie o servidor:
  ```bash
  npm run start:dev
  ```
3. O servidor estará acessível em: `http://localhost:3333`

- **Para executar o Frontend**:
1. Navegue até o diretório do frontend (`cd Frontend`).
2. Inicie a aplicação React:
  ```bash
  npm run dev
  ```
3. O frontend estará acessível em: `http://localhost:5173`

---

## Como Contribuir
1. **Fork esse repositório.**
2. **Crie uma branch para a sua mudança:**
   ```bash
   git checkout -b sua-branch
   ```
3. **Faça suas alterações e envie um pull request:**
   ```bash
     git add .
     git commit -m "Descrição da mudança"
     git push origin sua-branch
   ```

---

## Contato
- [Vandilson Brito](https://www.linkedin.com/in/vandilson-brito-desenvolvedor-fullstack/)
