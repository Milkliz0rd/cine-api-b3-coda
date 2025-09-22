# Ciné API — Template (Express + PostgreSQL sur Neon, SQL brut)

## 🚀 Démarrage rapide

1. **Cloner** ce repo puis installer les dépendances :

```bash
npm install
```

2. **Configurer l'environnement** : copier `.env.example` en `.env` puis renseigner `DATABASE_URL` (Neon) et `PORT` si besoin.

3. **Créer le schéma** :

```bash
psql "$DATABASE_URL" -f sql/schema.sql
psql "$DATABASE_URL" -f sql/seed.sql   # (optionnel)
```

4. **Lancer le serveur** :

```bash
npm run dev
# http://localhost:3000/health
# http://localhost:3000/api-docs
```

5. **Lancer les tests** :

```bash
npm test
```

## 📂 Arborescence

```
src/
  app.js
  server.js
  db.js
  swagger.js
  middleware/errorHandler.js
  controllers/
    filmsController.js
    reviewsController.js
  routes/
    films.js
    reviews.js
sql/
  schema.sql
  seed.sql
tests/
  health.test.js
  films.test.js
```

## 🧱 À compléter pour le projet

- Implémenter **tous les endpoints REST** pour `films` et `reviews`.
- Crée les services pour les **controllers**
- Rédiger la **documentation Swagger** pour chaque route.
- Écrire des **tests unitaires** (Jest + SuperTest) couvrant au minimum `GET /films` et `POST /films`.
- Gérer les **erreurs** et **codes HTTP** proprement.
- Soigner l’**organisation du code** (routes, contrôleurs, services si besoin).

## 💡 Conseils pédagogiques

- Commencer simple (CRUD en mémoire), puis brancher la **base de données**.
- Travailler par **petits incréments** + tests fréquents.
- Utiliser **Postman** pour explorer et documenter les appels.
