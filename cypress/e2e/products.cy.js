describe('products', () => {
    it('deve permitir usuário administrador criar um produto', () => {
        cy.criarProduto();
    });

    it('não deve permitir usuário sem permissão de administrador criar um produto', () => {
        cy.criarProdutoSemPermissaoAdm();
    });

    it('não deve permitir criar um produto com campos vazios', () => {
        cy.criarProdutoComCamposVazios();
    });

    it('não deve permitir criar um produto com campos com tipos de dados incorretos', () => {
        cy.criarProdutoComTiposDeDadosIncorretos();
    });
});
