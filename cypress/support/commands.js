const faker = require('faker-br');
const BASE_URL = Cypress.env('API_URL');

const nome = faker.name.firstName();
const sobrenome = faker.name.lastName();
const nomeCompleto = `${nome} ${sobrenome}`;
const email = faker.internet.email(nome, sobrenome);
const endereco = faker.address.streetAddress();
const telefone = faker.phone.phoneNumber();
const senha = 'Senha@2025';

Cypress.Commands.add('cadastrarUsuario', () => {
    cy.request({
        method: 'POST',
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
        cy.log('Status: ' + response.status);
        cy.log('Body: ' + JSON.stringify(response.body));
        
        expect(response.status).to.equal(201);
    });
});
