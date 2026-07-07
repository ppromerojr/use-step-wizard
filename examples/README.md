# Examples

Demo apps for [`use-step-wizard`](https://www.npmjs.com/package/use-step-wizard) from npm.

## React (web)

Vite + React demo.

```bash
cd examples/react-web
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## React Native

Expo SDK 57 demo for iOS and Android.

Requires Node.js 22.13+.

```bash
cd examples/react-native
npm install
npx expo install --fix
npm run start
```

Then press `i` for iOS simulator or `a` for Android emulator in the Expo CLI.

## Local development

To test unpublished changes from the repo root, replace the dependency in an example's `package.json`:

```json
"use-step-wizard": "file:../.."
```

Then build the library and reinstall:

```bash
npm run build
cd examples/react-web && npm install
```

For React Native with a local link, add a `metro.config.js` that watches the monorepo root.
