### Find A Frined API.

#### RFs (Requisitos Funcionais - funcionalidades da aplicação, o que o usuário pode fazer na aplicação).

- [X] - Deve ser possível se cadastrar como uma ORG;

- [X] - Deve ser possível realizar login como uma ORG;

- [X] - Deve ser possível cadastrar um pet;

- [X] - Deve ser possí­vel adicionar fotos do pet;

- [X] - Deve ser possível listar todos os pets disponíveis (não adotados) para adoção em uma cidade;

- [X] - Deve ser possível filtrar pets por suas características;

- [X] - Deve ser possível visualizar detalhes de um pet para adoção;



#### RNs (Regras de Negócio - condições aplicadas às funcionalidades. Quando/como tal funcionalidade deve acontecer).

- [X] - Para uma ORG acessar a aplicação como admin (cadastrar, editar ou remover seus pets), ela precisa estar logada;

- [X] - Para listar os pets, obrigatoriamente é preciso informar a cidade;

- [X] - Uma ORG precisa ter um endereço e um número de WhatsApp;

- [X] - Um pet deve estar ligado a uma ORG;

- [X] - Um pet pode ter status "disponível" ou "adotado";

- [X] - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;

- [X] - Todos os filtros, além da cidade, são opcionais;

  
#### RNFs (Requisitos Não-Funcionais - pensado pelo desenvolvedor, quais tecnologias e estratégias usar)

- [X] - A senha do usuário precisa estar criptografada;

- [X] - Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;

- [X] - Todas listas de dados precisam estar paginadas com 20 itens por página;

- [X] - O usuário deve ser identificado por um JWT (JSON Web Token);

- [X] - Implementar Rate Limiting para proteger contra abusos na API;

#### Como rodar localmente

Pré-requisitos: Node.js 22+ e Docker (aberto).

**Primeira vez** (na raiz do repositório):

```bash
cp backend/.env.example backend/.env     # ajuste JWT_SECRET e, para upload de fotos, as chaves do Cloudinary
cp frontend/.env.example frontend/.env   # VITE_API_URL=http://localhost:3333
npm run setup                            # instala dependências, sobe o banco e cria as tabelas
npm run db:seed                          # opcional: APAGA o banco e cria ONGs e pets de exemplo
```

**No dia a dia:**

```bash
npm run dev    # sobe banco + API (http://localhost:3333) + frontend (http://localhost:5173) em um só terminal
```

| Comando              | O que faz                                                      |
| -------------------- | -------------------------------------------------------------- |
| `npm run setup`      | Instala dependências da raiz, backend e frontend; sobe o banco e aplica as migrations |
| `npm run dev`        | Sobe o banco (se ainda não estiver de pé), a API e o frontend juntos |
| `npm run db:up`      | Sobe o PostgreSQL no Docker e espera ele ficar pronto          |
| `npm run db:down`    | Para o container do banco (os dados são perdidos)              |
| `npm run db:migrate` | Aplica as migrations do Prisma                                 |
| `npm run db:seed`    | Apaga o banco e recria os dados de exemplo                     |
| `npm run db:studio`  | Abre o Prisma Studio, uma interface visual para ver/editar o banco |

> O CORS da API só aceita `http://localhost:5173`, `http://localhost:3333` e o valor de `CLIENT_URL`. Se o Vite subir em outra porta, ajuste `CLIENT_URL` no `.env` do backend.

#### Logins de teste

Para testar a área administrativa da ONG (cadastrar, editar e remover pets), use uma das contas abaixo. **Todas usam a mesma senha: `senha123`.**

| ONG                | E-mail                     | Senha      | Cidade         |
| ------------------ | -------------------------- | ---------- | -------------- |
| Amigos dos Animais | `contato@amigos.org`       | `senha123` | São Paulo      |
| Patas Felizes      | `contato@patasfelizes.org` | `senha123` | Rio de Janeiro |
| Mundo Animal       | `contato@mundoanimal.org`  | `senha123` | Curitiba       |
| SOS Pet            | `contato@sospet.org`       | `senha123` | Belo Horizonte |
| Anjos de Patas     | `contato@anjosdepatas.org` | `senha123` | Porto Alegre   |

- **App publicado (demo):** os mesmos logins funcionam em https://find-a-friend-official.vercel.app. São contas de demonstração públicas: qualquer pessoa pode alterar esses dados, então não guarde nada importante nelas.
- **Local:** as contas só existem depois de rodar `npm run db:seed`, que **apaga o banco** e recria as ONGs e os pets de exemplo. A fonte dos dados é `prisma/seed.ts`; se mudar algo lá, atualize esta tabela.
- **Cypress:** os testes E2E usam `user@example.com` / `123456`, mas esse login é simulado (a resposta da API é falsa) e **não funciona** no app de verdade.
