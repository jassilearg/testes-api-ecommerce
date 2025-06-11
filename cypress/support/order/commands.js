Cypress.Commands.add("criarOrdemDadosValidos", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/auth/signIn`,
    body: {
      email: "admin@email.com",
      password: "123456"
    }
  }).then((response) => {
    const token = response.body.accessToken

    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/orders`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        productId: "0197428c-6134-775e-bc8f-ba4506bc7d5f",
        quantity: 2
      }
    }).then((res) => {
      cy.log("Produto criado:", JSON.stringify(res.body))
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property("id")
    })
  })
})

Cypress.Commands.add("criarOrdemEstoqueMenor", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/auth/signIn`,
    body: {
      email: "admin@email.com",
      password: "123456"
    }
  }).then((response) => {
    const token = response.body.accessToken

    cy.request({
      method: "POST",
      url: `${Cypress.env("API_URL")}/orders`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        productId: "0197428c-6134-775e-bc8f-ba4506bc7d5f",
        quantity: 999
      }
    }).then((res) => {
      cy.log("Produto criado:", JSON.stringify(res.body))
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property("id")
    })
  })
})

Cypress.Commands.add("criarOrdemProdutoInexistente", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/auth/signIn`,
    body: {
      email: "testes@testes.com",
      password: "Testes@2025"
    }
  }).then((response) => {
    const token = response.body.accessToken

    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: `${Cypress.env("API_URL")}/orders`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        productId: "0197428c-6134-775e-bc8f-ba4506bc7d5g",
        quantity: 2
      }
    }).then((res) => {
      cy.log("Mensagem de erro:", JSON.stringify(res.body.message))
      expect(res.status).to.eq(404)
      expect(res.body).to.have.property("error").to.eq("Not Found")
    })
  })
})

Cypress.Commands.add("criarOrdemComTiposDeDadosIncorretos", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/auth/signIn`,
    body: {
      email: "admin@email.com",
      password: "123456"
    }
  }).then((response) => {
    const token = response.body.accessToken

    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: `${Cypress.env("API_URL")}/orders`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        productId: 0,
        quantity: "teste"
      }
    }).then((res) => {
      cy.log("Mensagem de erro:", JSON.stringify(res.body.message))
      expect(res.status).to.eq(400)
      expect(res.body).to.have.property("error").to.eq("Bad Request")
    })
  })
})

Cypress.Commands.add("criarOrdemComCamposVazios", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/auth/signIn`,
    body: {
      email: "admin@email.com",
      password: "123456"
    }
  }).then((response) => {
    const token = response.body.accessToken

    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: `${Cypress.env("API_URL")}/orders`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        productId: "",
        quantity: ""
      }
    }).then((res) => {
      cy.log("Mensagem de erro:", JSON.stringify(res.body.message))
      expect(res.status).to.eq(400)
      expect(res.body).to.have.property("error").to.eq("Bad Request")
    })
  })
})
