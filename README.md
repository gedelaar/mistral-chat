# Mistral Chat App

Minimale webapp met een eenvoudige chatinterface die de Mistral API aanroept
via de officiële TypeScript SDK ([@mistralai/mistralai](https://www.npmjs.com/package/@mistralai/mistralai)),
met het model `mistral-small-latest`. De API-sleutel wordt uitsluitend
serverzijde bewaard (`.env`) en komt nooit in de browser.

## Structuur

- `server.js` — Express-server met `POST /api/chat` (SDK-aanroep, sleutel blijft serverzijde)
- `public/index.html` — eenvoudige chatinterface
- `.env` — hier staat `MISTRAL_API_KEY` (niet in git)

## Installatie

```bash
npm install
cp .env.example .env
# zet je Mistral API-sleutel in .env:
#   MISTRAL_API_KEY=...
```

## Lokaal draaien

```bash
npm start
```

Open daarna http://localhost:3000 in je browser.
