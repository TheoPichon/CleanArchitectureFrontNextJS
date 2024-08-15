This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demmarage du projet

Avant de lancer le projet pour la première fois, assurez-vous d'installer toutes les dépendances :

```bash
pnpm install
```

Note : Si vous n'avez pas pnpm d'installé, vous pouvez l'installer avec npm :

```bash
npm install -g pnpm
```

## Lancement du serveur de développement

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Ouvrez http://localhost:3000 dans votre navigateur pour voir le résultat.

## Commandes disponibles

- `dev` : lance le serveur de développement sur http://localhost:3000
- `build` : crée une version de production de l'application
- `start` : démarre un serveur de production
- `test` : lance les tests unitaires avec Jest
- `lint-and-format` : lance le linter ESLint et le formateur Prettier

## Configuration CI/CD

Ce projet est configuré pour utiliser une pipeline CI/CD avec GitHub Actions et Vercel :

### GitHub Actions

Chaque fois que vous poussez du code sur la branche main ou que vous créez une pull request, les
actions suivantes sont exécutées :

    Tests unitaires : Les tests sont exécutés avec pnpm test pour s'assurer que le code fonctionne correctement.

    Lint et formatage : Le code est vérifié avec pnpm lint et formaté avec pnpm prettier --check ..

    Vercel : Après chaque merge sur le main, l'application est automatiquement déployée sur Vercel.

Le déploiement est effectué une fois que tous les tests et vérifications sont passés avec succès.

