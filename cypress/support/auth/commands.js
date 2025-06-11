const faker = require("faker-br")
const BASE_URL = Cypress.env("API_URL")

const nome = faker.name.firstName()
const sobrenome = faker.name.lastName()
const email = faker.internet.email(nome, sobrenome)

Cypress.Commands.add("cadastrarUsuario", () => {
  const nomeDoMeio = faker.name.lastName()
  const nomeCompleto = `${nome} ${nomeDoMeio} ${sobrenome}`
  const endereco = faker.address.streetAddress()
  const telefone = faker.phone.phoneNumber()
  const senha = "Senha@2025"

  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signUp`,
    body: {
      name: nome,
      fullname: nomeCompleto,
      email: email,
      address: endereco,
      contact: telefone,
      password: senha
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    expect(response.status).to.equal(201)
    expect(response.body).to.have.property("accessToken")
  })
})

Cypress.Commands.add("cadastrarUsuarioCamposVazios", () => {
  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signUp`,
    failOnStatusCode: false,
    body: {
      name: "",
      fullname: "",
      email: "",
      address: "",
      contact: "",
      password: ""
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    expect(response.status).to.equal(400)
    expect(response.body.error).to.eq("Bad Request")
  })
})

Cypress.Commands.add("cadastrarUsuarioComEmailInvalido", () => {
  const nome = faker.name.firstName()
  const sobrenome = faker.name.lastName()
  const nomeDoMeio = faker.name.lastName()
  const nomeCompleto = `${nome} ${nomeDoMeio} ${sobrenome}`
  const endereco = faker.address.streetAddress()
  const telefone = faker.phone.phoneNumber()
  const email = "email_invalido"
  const senha = "Senha@2025"

  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signUp`,
    failOnStatusCode: false,
    body: {
      name: nome,
      fullname: nomeCompleto,
      email: email,
      address: endereco,
      contact: telefone,
      password: senha
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    const message = response.body.message[0]

    expect(response.status).to.eq(400)
    expect(message).to.eq("email must be an email")
  })
})

Cypress.Commands.add("cadastrarUsuarioComSenhaFraca", () => {
  const nome = faker.name.firstName()
  const sobrenome = faker.name.lastName()
  const nomeDoMeio = faker.name.lastName()
  const nomeCompleto = `${nome} ${nomeDoMeio} ${sobrenome}`
  const endereco = faker.address.streetAddress()
  const telefone = faker.phone.phoneNumber()
  const email = faker.internet.email(nome, sobrenome)
  const senha = "senhafraca"

  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signUp`,
    failOnStatusCode: false,
    body: {
      name: nome,
      fullname: nomeCompleto,
      email: email,
      address: endereco,
      contact: telefone,
      password: senha
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    const message = response.body.message[0]

    expect(response.status).to.eq(400)
    expect(message).to.eq("password is not strong enough")
  })
})

Cypress.Commands.add("logarUsuario", () => {
  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signIn`,
    body: {
      email: "testes@testes.com",
      password: "Testes@2025"
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    expect(response.status).to.eq(201)
    expect(response.body).to.have.property("accessToken")
  })
})

Cypress.Commands.add("loginUsuarioDadosNaoCadastrados", () => {
  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signIn`,
    failOnStatusCode: false,
    body: {
      email: "email@incorreto.com",
      password: "SenhaIncorreta@2025"
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    expect(response.status).to.eq(401)
    expect(response.body.message).to.eq("Invalid Credentials")
  })
})

Cypress.Commands.add("loginUsuarioEmailInvalido", () => {
  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signIn`,
    failOnStatusCode: false,
    body: {
      email: "email_invalido",
      password: "senha"
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    const message = response.body.message[0]

    expect(response.status).to.eq(400)
    expect(message).to.eq("email must be an email")
  })
})

Cypress.Commands.add("loginUsuarioEmailNaoConfirmado", () => {
  cy.request({
    method: "POST",
    url: `${BASE_URL}/auth/signIn`,
    failOnStatusCode: false,
    body: {
      email: email,
      password: "Senha@2025"
    }
  }).then((response) => {
    cy.log("Status: " + response.status)
    cy.log("Body: " + JSON.stringify(response.body))

    expect(response.status).to.eq(409)
    expect(response.body.message).to.eq("Confirm your E-mail before continuing")
  })
})
