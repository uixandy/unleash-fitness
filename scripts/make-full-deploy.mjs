import fs from 'fs'
import path from 'path'

const skipNames = new Set(['node_modules', 'dist', '.git', '.vercel', 'scripts'])
const skipFiles = new Set([
  'package-lock.json',
  '.env',
  'deploy-mcp-body.json',
  'tiny-deploy.json',
  'icon.png',
  'unleash-logo-light.svg',
  'unleash-workout-tracker-logo-light.svg',
])

const files = []
function walk(dir, rel = '') {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipNames.has(ent.name) || ent.name.startsWith('.deploy')) continue
    if (skipFiles.has(ent.name)) continue
    if (ent.name.endsWith('.jpg') || ent.name.endsWith('.jpeg')) continue
    if (ent.name.endsWith('.json') && ent.name.includes('deploy')) continue
    const full = path.join(dir, ent.name)
    const r = (rel ? `${rel}/${ent.name}` : ent.name).replace(/\\/g, '/')
    if (ent.isDirectory()) walk(full, r)
    else {
      const buf = fs.readFileSync(full)
      const isBin = /\.(png|gif|webp|ico)$/i.test(ent.name)
      files.push({
        file: r,
        data: isBin ? buf.toString('base64') : buf.toString('utf8'),
        encoding: isBin ? 'base64' : 'utf-8',
      })
    }
  }
}
walk('.')

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

fs.writeFileSync('full-deploy.json', JSON.stringify(args))
console.log(files.length, fs.statSync('full-deploy.json').size)
console.log(files.map((f) => f.file).join('\n'))
