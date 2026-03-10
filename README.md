# api-nodejs

[Português](README.md) | [English](README.en.md)

![Node.js](https://img.shields.io/badge/node.js-20%2B-339933)
![React](https://img.shields.io/badge/react-19-61DAFB)
![Status](https://img.shields.io/badge/status-active-brightgreen)

Projeto com backend Node.js (Express + MongoDB) e frontend React.

## Sumario

- [Visao Geral](#visao-geral)
- [Requisitos](#requisitos)
- [Estrutura](#estrutura)
- [Backend](#backend)
- [Frontend](#frontend)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

## Visao Geral

- `backend/`: API REST, Swagger, testes com Jest/Supertest
- `frontend/`: aplicacao React consumindo a API
- `docker-compose.yml` na raiz: sobe o backend + MongoDB

## Requisitos

- Node.js 20+
- npm 10+
- Docker (opcional)

## Estrutura

```text
api-nodejs/
  backend/
    api/
    config/
    tests/
    server.js
    swagger.js
    package.json
  frontend/
    src/
    public/
    package.json
  docker-compose.yml
  README.md
```

## Backend

### Instalacao

```powershell
Set-Location "c:\Users\leo_a\projetos\api-nodejs\backend"
npm install
```

### Execucao

```powershell
npm run dev
```

Por padrao, a API sobe na porta `3000` (`backend/config/default.json`).

### Swagger

Gerar/atualizar especificacao:

```powershell
npm run swagger
```

Documentacao da API:

- `http://localhost:3000/docs`

### Testes e qualidade

```powershell
npm test
npm run test:unit
npm run test:integration
npm run lint
npm run lint:fix
npm run format
```

## Frontend

### Instalacao

```powershell
Set-Location "c:\Users\leo_a\projetos\api-nodejs\frontend"
npm install
```

### Execucao

```powershell
npm start
```

O frontend usa proxy para `http://localhost:3000` (configurado no `frontend/package.json`).

### Testes e build

```powershell
npm test -- --watchAll=false
npm run build
npm run format
```

## Docker

Subir backend + MongoDB pela raiz:

```powershell
Set-Location "c:\Users\leo_a\projetos\api-nodejs"
docker compose up --build
```

## Troubleshooting

- API nao conecta no banco: valide `DATABASE_URL` e parametros em `backend/config/default.json`.
- Frontend nao encontra API: confirme backend em `localhost:3000` e proxy do React.
- Erro em `npm test` no frontend: execute com `--watchAll=false` em ambiente nao interativo.
