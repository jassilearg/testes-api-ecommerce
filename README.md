# 🚀 Como Rodar um Projeto com Cypress na Sua Máquina

Este guia apresenta o passo a passo para clonar um projeto, instalar dependências e executar testes automatizados com o **Cypress**.

---

## 📁 1. Clonar o Repositório

Abra o terminal na pasta onde deseja salvar o projeto e execute:

```bash
git clone <url-do-projeto>
```

> 🔄 Substitua `<url-do-projeto>` pela URL real do repositório.

---

## 📂 2. Acessar a Pasta do Projeto

Entre na pasta do projeto recém-clonado:

```bash
cd nome-do-projeto
```

> 🗂️ Substitua `nome-do-projeto` pelo nome da pasta clonada.

---

## 📦 3. Instalar as Dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

> ✅ Esse comando instalará todas as dependências definidas no `package.json`, incluindo o Cypress.

---

## 🧪 4. Executar os Testes no Chrome

Com tudo pronto, execute os testes usando o navegador Chrome:

```bash
npx cypress run --browser chrome
```

> 🖥️ O Cypress será executado em modo headless no Chrome.  
> ⚠️ Certifique-se que a API está sendo executada antes de executar esse comando.
---

## 🖱️ 5. (Opcional) Executar via Interface Gráfica

Para abrir a interface visual do Cypress e rodar os testes manualmente:

```bash
npx cypress open
```

> A interface permitirá escolher os testes e o navegador interativamente.

---

## ✅ Pronto!

Agora seu ambiente está configurado e os testes podem ser executados com sucesso!

---

### 🔗 Referência

- [Documentação oficial do Cypress](https://docs.cypress.io)
