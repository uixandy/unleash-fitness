import fs from 'fs'

const files = [
  {
    file: 'package.json',
    data: fs.readFileSync('package.json', 'utf8'),
    encoding: 'utf-8',
  },
  {
    file: 'index.html',
    data: `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>UNLEASH</title></head>
<body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>
`,
    encoding: 'utf-8',
  },
  {
    file: 'vite.config.js',
    data: `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })\n`,
    encoding: 'utf-8',
  },
  {
    file: 'src/main.jsx',
    data: `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App'\nReactDOM.createRoot(document.getElementById('root')).render(<App />)\n`,
    encoding: 'utf-8',
  },
  {
    file: 'src/App.jsx',
    data: `export default function App() {
  return (
    <main style={{ background: '#080E0C', color: '#F0F0EE', minHeight: '100vh', fontFamily: 'sans-serif', padding: 40 }}>
      <h1>UNLEASH</h1>
      <p>Marketing site deploying…</p>
    </main>
  )
}
`,
    encoding: 'utf-8',
  },
]

const args = {
  target: 'production',
  name: 'unleash-fitness',
  teamId: 'team_wy6OFjcs43gC7Uk4BIgkXuQr',
  projectSettings: {
    framework: 'vite',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
  },
  files,
}

fs.writeFileSync('tiny-deploy.json', JSON.stringify(args))
console.log('size', fs.statSync('tiny-deploy.json').size)
