<div align="center">
  <h1>TechPro</h1>
  <p>Repositório oficial do projeto.</p>
</div>

---

## Integrantes

- Marcos Forchezato
- Matheus Di Domenico
- Matheus Leandro

---

## Board do projeto

Acompanhe o andamento das tarefas no Trello:

🔗 [Board TechPro no Trello](https://trello.com/b/mT790Ifd/techpro)

---

## Cliente

Instagram oficial do cliente:

🔗 [@techprors](https://www.instagram.com/techprors/)

---

## Identidade

Paleta de cores extraída dos materiais oficiais da TechPro:

<table>
  <tr>
    <td align="center">
      <img src="https://placehold.co/60x60/00C8FF/00C8FF.png" /><br />
      <code>#00C8FF</code>
    </td>
    <td align="center">
      <img src="https://placehold.co/60x60/161A3D/161A3D.png" /><br />
      <code>#161A3D</code>
    </td>
    <td align="center">
      <img src="https://placehold.co/60x60/2D3252/2D3252.png" /><br />
      <code>#2D3252</code>
    </td>
    <td align="center">
      <img src="https://placehold.co/60x60/EDEDED/EDEDED.png" /><br />
      <code>#EDEDED</code>
    </td>
  </tr>
</table>

---

## Linguagens e tecnologias

> Stack ainda em definição.

<div align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
</div>

---


## Como executar o projeto

### Pré-requisitos

- Node.js e npm
- PostgreSQL em execução

### Passo a passo

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone https://github.com/marcosforchezato/board--techpro-.git
   cd board--techpro-
   ```

2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Crie um banco de dados PostgreSQL vazio chamado `techpro`. Por exemplo, conectado ao PostgreSQL:

   ```sql
   CREATE DATABASE techpro;
   ```

4. Crie um arquivo `.env` na raiz do projeto com as configurações abaixo. Solicite acesso ao banco de dados e substitua o valor de `DATABASE_URL` pela conexão fornecida. Defina também um valor longo e aleatório para `JWT_SECRET`:

   ```env
   DATABASE_URL="Solicitar Acesso ao Banco de Dados"
   JWT_SECRET="substitua-por-uma-chave-aleatoria-longa"
   NEXT_PUBLIC_SISTEMA_GESTAO="true"
   ```

   `NEXT_PUBLIC_SISTEMA_GESTAO` habilita as telas do sistema de gestão. Use `"false"` para mantê-las desabilitadas. O arquivo `.env` é ignorado pelo Git; não compartilhe nem versione segredos.

5. Aplique as migrações, gere o Prisma Client e carregue os dados iniciais:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   npx prisma db seed
   ```

6. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

7. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

O seed cria o usuário administrador `admin` com a senha inicial `0000`. Use essas credenciais apenas no ambiente local e altere a senha antes de disponibilizar o sistema.

### Executar em modo de produção

Depois de configurar as variáveis de ambiente e o banco de dados, gere a versão de produção e inicie o servidor:

```bash
npm run build
npm run start
```

---
