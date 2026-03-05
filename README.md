# Gerenciador de Documentos

Aplicação completa para gerenciamento de documentos, composta por uma API RESTful e uma interface web.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com **Fastify**
- **TypeScript**
- **Prisma ORM** com **PostgreSQL**
- **Vitest** (Testes Unitários)
- **Swagger/Scalar** (Documentação da API)
- Arquitetura em camadas (Controller, Service, Routes)

### Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Integração via Fetch API

## ⚙️ Pré-requisitos

- Node.js (v18+)
- PostgreSQL (Local ou via Docker)

## 🛠️ Instalação e Execução

### 1. Subir o Banco de Dados (Docker)

O projeto possui um arquivo `docker-compose.yml` para facilitar a criação do banco PostgreSQL.

Na raiz do projeto, execute:
```bash
docker-compose up -d
```
Isso iniciará um container PostgreSQL na porta 5432.

### 2. Configurar o Backend

Entre na pasta do backend:
```bash
cd backend
```

Instale as dependências:
```bash
npm install
```

Configure o banco de dados. Crie um arquivo `.env` na pasta `backend` com a string de conexão (compatível com o docker-compose):
```env
DATABASE_URL="postgresql://admin:admin123@localhost:5432/doc-manager_db?schema=public"
```

Rode as migrações do Prisma para criar as tabelas:
```bash
npx prisma migrate dev
```

Inicie o servidor:
```bash
npm run dev
```
O servidor rodará em `http://localhost:3333`.

📖 **Documentação da API:** Acesse `http://localhost:3333/docs` para ver o Swagger.

### 2. Rodar os Testes (Backend)

Para executar os testes unitários implementados (Diferencial do teste):

```bash
npm test
```

### 3. Configurar o Frontend

Entre na pasta do frontend:
```bash
cd frontend
```

Instale as dependências:
```bash
npm install
```

Start o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse a aplicação em `http://localhost:3000`.