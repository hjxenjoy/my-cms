import fs from 'fs'
const tomlContent = process.env.WRANGLER_TOML_CONTENT

if (tomlContent) {
  fs.writeFileSync('wrangler.toml', tomlContent)
  console.log('wrangler.toml 已从环境变量生成')
}
