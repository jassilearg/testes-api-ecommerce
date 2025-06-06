describe('clientes', () => {
    it('deve permitir usuário administrador criar um produto', () => {
        cy.criarProduto();
    });

    it('não deve permitir usuário sem permissão de administrador criar um produto', () => {
        cy.criarProdutoSemPermissaoAdm();
    });

});
