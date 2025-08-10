# Port Russell — API + EJS

Application Node.js / Express / MongoDB pour gérer les catways et leurs réservations (moteur de templates **EJS** + **Swagger** + **JSDoc**).

## Liens livrables

- **Dépôt GitHub** : https://github.com/nelybi/port-russell-api
- **Application (en ligne via ngrok)** : https://41de34ad07ee.ngrok-free.app
  - Identifiants démo : `admin@port-russell.local` / `Admin123!`
  - **Swagger** : https://41de34ad07ee.ngrok-free.app/api-docs

> Note : l’URL ngrok reste active tant que le tunnel est ouvert. En cas de changement, je mettrai à jour ce lien.


## Stack

- Node.js, Express
- MongoDB (Mongoose)
- Sessions (express-session + connect-mongo)
- EJS (vues), Swagger (OpenAPI), JSDoc

## Lancer en local

### Prérequis

- Node 18+
- MongoDB local en cours d’exécution (`brew services start mongodb-community@7.0` sur macOS)

### Installation

```bash
npm i
```
