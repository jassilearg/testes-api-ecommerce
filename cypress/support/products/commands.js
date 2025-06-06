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
