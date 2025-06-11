Cypress.Commands.add('criarOrdemIdInvalido', () => {
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
      url: `${Cypress.env('API_URL')}/orders`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "productId": "0195c990-00a6-741d-9226-e956c7a9281d",
        "quantity": 2
      }
    }).then((res) => {
      cy.log('Mensagem de erro:', JSON.stringify(res.body.message));
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('error').to.eq("Not Found");
    });
  });
});
