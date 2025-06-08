const fs = require("fs")
const path = require("path")
const ExcelJS = require("exceljs")
const { format } = require("date-fns")

const reportPath = path.join(__dirname, "merged-json", "mochawesome.json")
const outputDir = path.join(__dirname, "xls")

// Colunas extras preenchíveis e suas posições (antes de "Status")
const editableColumns = ["Entrada", "Resultado Esperado", "Resultado Obtido"]
// const reviewColumns = ["Severidade", "Prioridade", "Comentários"]

if (!fs.existsSync(reportPath)) {
  console.error(`❌ Arquivo JSON mergeado não encontrado: ${reportPath}`)
  process.exit(1)
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

function gerarAbreviacao(nome) {
  const parts = nome.split(/\s+/)
  let abreviacao = ""
  for (const p of parts) {
    abreviacao += p.slice(0, 3).toUpperCase()
    if (abreviacao.length >= 5) break
  }
  return abreviacao.slice(0, 5)
}

function capitalizar(texto) {
  if (!texto) return texto
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

const counters = {}
function gerarTestId(funcionalidade) {
  const sigla = gerarAbreviacao(funcionalidade)
  if (!counters[sigla]) counters[sigla] = 0
  counters[sigla]++
  return `${sigla}_${String(counters[sigla]).padStart(3, "0")}`
}

async function gerarRelatorio() {
  const raw = fs.readFileSync(reportPath)
  const report = JSON.parse(raw)

  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Relatório")

  // Cabeçalhos
  const headers = [
    "ID do Teste",
    "Funcionalidade",
    "Descrição",
    "Duração (ms)",
    ...editableColumns,
    "Status"
    // ...reviewColumns
  ]

  // Título
  const dateForTitle = format(new Date(), "dd/MM/yyyy")

  sheet.mergeCells(1, 1, 1, headers.length)
  const titleCell = sheet.getCell("A1")
  titleCell.value = `Relatório de Testes de Caixa Preta - ${dateForTitle}`
  titleCell.alignment = { horizontal: "center", vertical: "middle" }
  titleCell.font = { size: 14, bold: true, color: { argb: "FFFFFF" } }
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "4472C4" }
  }

  const headerRow = sheet.addRow(headers)
  headerRow.font = { bold: true, color: { argb: "FFFFFF" } }
  headerRow.alignment = { horizontal: "center", vertical: "middle" }
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "264478" }
    }
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    }
  })

  // Ativar autofiltro nas colunas relevantes
  sheet.autoFilter = {
    from: { row: 2, column: 1 },
    to: { row: 2, column: headers.length }
  }

  let rowIndex = 3
  report.results.forEach((result) => {
    result.suites.forEach((suite) => {
      let funcionalidade = suite.title?.trim() || "Funcionalidade"
      funcionalidade = capitalizar(funcionalidade)

      suite.tests.forEach((test) => {
        const testId = gerarTestId(funcionalidade)
        const status = (test.state || "").toUpperCase()
        const descricao = capitalizar(test.title) || "[fill]"
        // const isFailed = status === "FAILED"
        // const severidade = isFailed ? "[fill]" : "--"
        // const prioridade = isFailed ? "[fill]" : "--"
        // const comentarios = ""

        const rowValues = [
          testId,
          funcionalidade,
          descricao,
          test.duration || 0,
          ...editableColumns.map(() => ""),
          status
          // severidade,
          // prioridade,
          // comentarios
        ]

        const row = sheet.addRow(rowValues)

        // Estilo das linhas alternadas
        const isEvenRow = rowIndex % 2 === 0
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
          }
          if (isEvenRow) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "F2F2F2" }
            }
          }
        })

        // Estilo da célula descrição
        const descricaoIndex = headers.indexOf("Descrição") + 1
        const descricaoCell = row.getCell(descricaoIndex)
        descricaoCell.alignment = { wrapText: true, vertical: "top" }
        row.height = 25

        // Estilo da célula de Status
        const statusIndex = headers.indexOf("Status") + 1
        const statusCell = row.getCell(statusIndex)
        statusCell.alignment = { horizontal: "center", vertical: "middle" }

        if (status === "PASSED") {
          statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "C6EFCE" }
          }
          statusCell.font = { color: { argb: "006100" }, bold: true }
        } else if (status === "FAILED") {
          statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC7CE" }
          }
          statusCell.font = { color: { argb: "9C0006" }, bold: true }
        }

        rowIndex++

        // Estilo das células severidade e prioridade
        // const severidadeIndex = headers.indexOf("Severidade") + 1
        // const prioridadeIndex = headers.indexOf("Prioridade") + 1
        // row.getCell(severidadeIndex).alignment = {
        //   horizontal: "center",
        //   vertical: "middle"
        // }
        // row.getCell(prioridadeIndex).alignment = {
        //   horizontal: "center",
        //   vertical: "middle"
        // }
      })
    })
  })

  // Ajuste de largura das colunas
  sheet.columns.forEach((col) => {
    col.width = 20
  })
  sheet.columns[2].width = 40

  const outputPath = path.join(outputDir, "relatorio-simplificado.xlsx")
  await workbook.xlsx.writeFile(outputPath)
  console.log(`✅ Arquivo XLSX gerado em: ${outputPath}`)
}

gerarRelatorio().catch(console.error)
