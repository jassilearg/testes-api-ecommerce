describe('clientes', () => {
    it('deve listar clientes a usuário logado', () => {
        cy.buscarClientes();
    });

    it('não deve listar clientes sem login do usuario', () => {
        cy.buscarClientesSemLogin();
    });

    it('não deve encontrar cliente inexistente', () => {
        cy.buscarClienteInexistente();
    });
});