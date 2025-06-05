describe('clientes', () => {
    it('deve listar todos os clientes', () => {
        cy.buscarTodosOsClientes();
    });

    it('não deve listar clientes sem que usuario esteja logado', () => {
        cy.buscarClientesSemLogin();
    });

    it('não deve encontrar cliente inexistente', () => {
        cy.buscarClienteInexistente();
    });

    it('deve encontrar cliente cadastrado', () => {
        cy.buscarClienteCadastrado();
    });
});
