Cypress.Commands.add('buscarClientes', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/auth/signIn`,
      body: {
        email: "testes@testes.com",
        password: "Testes@2025"
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('accessToken');
  
      const token = response.body.accessToken;
  
      cy.request({
        method: 'GET',
        url: `${Cypress.env('API_URL')}/clients`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        cy.log('Clientes encontrados:', JSON.stringify(res.body));
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array').and.have.length.greaterThan(1);
      });
    });
});

Cypress.Commands.add('buscarClientesSemLogin', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/clients`,
    failOnStatusCode: false
  }).then((res) => {
    expect(res.status).to.eq(401);
  });
});
