Cypress.Commands.add('criarProduto', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/auth/signIn`,
      body: {
        email: "admin@email.com",
        password: "123456"
      }
    }).then((response) => {
      const token = response.body.accessToken;
  
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/products`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          "name": "Monster No Sugar",
          "description": "Monster Energy Drink no sugar",
          "price": 9,
          "stock": 5,
          "Tags": [
            {
              "label": "no sugar",
              "value": "noSugar"
            }
          ]
        }
      }).then((res) => {
        cy.log('Produto criado:', JSON.stringify(res.body));
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property('id');
      });
    });
});

Cypress.Commands.add('criarProdutoSemPermissaoAdm', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/auth/signIn`,
    body: {
      email: "testes@testes.com",
      password: "Testes@2025"
    }
  }).then((response) => {
    const token = response.body.accessToken;

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: `${Cypress.env('API_URL')}/products`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "name": "Monster No Sugar",
        "description": "Monster Energy Drink no sugar",
        "price": 9,
        "stock": 5,
        "Tags": [
          {
            "label": "no sugar",
            "value": "noSugar"
          }
        ]
      }
    }).then((res) => {
      cy.log('Mensagem de erro:', JSON.stringify(res.body.message));
      expect(res.status).to.eq(403);
      expect(res.body).to.have.property('error').to.eq("Forbidden");
    });
  });
});

Cypress.Commands.add('criarProdutoComCamposVazios', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/auth/signIn`,
    body: {
      email: "admin@email.com",
      password: "123456"
    }
  }).then((response) => {
    const token = response.body.accessToken;

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: `${Cypress.env('API_URL')}/products`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "name": "",
        "description": "",
        "price": 0,
        "stock": 0,
        "Tags": [
          {
            "label": "",
            "value": ""
          }
        ]
      }
    }).then((res) => {
      cy.log('Mensagem de erro:', JSON.stringify(res.body.message));
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error').to.eq("Bad Request");
    });
  });
});

Cypress.Commands.add('criarProdutoComTiposDeDadosIncorretos', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/auth/signIn`,
    body: {
      email: "admin@email.com",
      password: "123456"
    }
  }).then((response) => {
    const token = response.body.accessToken;

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: `${Cypress.env('API_URL')}/products`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "name": 1,
        "description": 1,
        "price": "",
        "stock": "",
        "Tags": [
          {
            "label": 1,
            "value": 1
          }
        ]
      }
    }).then((res) => {
      cy.log('Mensagem de erro:', JSON.stringify(res.body.message));
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error').to.eq("Bad Request");
    });
  });
});
