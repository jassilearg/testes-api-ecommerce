const fs = require("fs")
const path = require("path")
const { glob } = require("glob") // Import correto
const marge = require("mochawesome-merge")

const jsonDir = path.join(__dirname, "jsons")

;(async () => {
  try {
    const files = await glob(`${jsonDir}/*.json`)
    if (files.length === 0) {
      console.warn("Nenhum arquivo JSON encontrado para merge.")
      process.exit(0)
    }

    const report = await marge.merge({ files })
    const outputDir = path.join(__dirname, "merged-json")

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    const outputPath = path.join(outputDir, "mochawesome.json")
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2))
    console.log(`✅ Merge criado com sucesso: ${outputPath}`)

    files.forEach((file) => fs.unlinkSync(file))
    console.log(
      `🧹 Arquivos JSON antigos removidos (${files.length} arquivos).`
    )
  } catch (error) {
    console.error("Erro durante o merge:", error)
    process.exit(1)
  }
})()
