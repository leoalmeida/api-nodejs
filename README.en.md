# api-nodejs

[Português](README.md) | [English](README.en.md)

![Node.js](https://img.shields.io/badge/node.js-20%2B-339933)
![React](https://img.shields.io/badge/react-19-61DAFB)
![Status](https://img.shields.io/badge/status-active-brightgreen)

Project with a Node.js backend (Express + MongoDB) and a React frontend.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Structure](#structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

## Overview

- `backend/`: REST API, Swagger, tests with Jest/Supertest
- `frontend/`: React application consuming the API
- root `docker-compose.yml`: starts backend + MongoDB

## Requirements

- Node.js 20+
- npm 10+
- Docker (optional)

## Structure

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

### Installation

```powershell
Set-Location "c:\Users\leo_a\projetos\api-nodejs\backend"
npm install
```

### Running

```powershell
npm run dev
```

By default, the API runs on port `3000` (`backend/config/default.json`).

### Swagger

Generate/update spec:

```powershell
npm run swagger
```

API docs:

- `http://localhost:3000/docs`

### Tests and quality

```powershell
npm test
npm run test:unit
npm run test:integration
npm run lint
npm run lint:fix
npm run format
```

## Frontend

### Installation

```powershell
Set-Location "c:\Users\leo_a\projetos\api-nodejs\frontend"
npm install
```

### Running

```powershell
npm start
```

Frontend uses proxy to `http://localhost:3000` (configured in `frontend/package.json`).

### Tests and build

```powershell
npm test -- --watchAll=false
npm run build
npm run format
```

## Docker

Start backend + MongoDB from project root:

```powershell
Set-Location "c:\Users\leo_a\projetos\api-nodejs"
docker compose up --build
```

## Troubleshooting

- API cannot connect to database: validate `DATABASE_URL` and values in `backend/config/default.json`.
- Frontend cannot reach API: confirm backend is running on `localhost:3000` and React proxy is configured.
- Frontend test issues in non-interactive mode: run with `--watchAll=false`.
