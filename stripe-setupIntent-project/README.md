# stripe-setupintent-sample-flows
## Start project:
```sh
cd stripe-setupIntent-project
netlify dev
```

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Deploying the project directly to Netlify:
```sh
netlify dev
npm run dev
netlify deploy
netlify deploy --prod
```
## or - if git repo connectet - just commit and push it
```sh
git add .
git commit -m "some comment"
git push -u origin main
```

### Netlify functions:
- under /stripe-setupIntent-backend:
```sh
netlify functions:build --functions /dist --src .
```
```sh
netlify functions:list
```
```sh
netlify deploy
```
```sh
netlify deploy --prod
```