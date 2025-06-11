describe('orders', () => {
    it('deve permitir usuário criar uma ordem com dados válidos', () => {
        cy.criarOrdemDadosValidos();
    });

    it('não deve permitir usuário criar uma ordem com pedido de id inválido', () => {
        cy.criarOrdemIdInvalido();
    });

    it('não deve permitir criar uma ordem com campos com tipos de dados incorretos', () => {
        cy.criarProdutoComTiposDeDadosIncorretos();
    });

    it('não deve permitir criar uma ordem com campos vazios', () => {
        cy.criarOrdemComCamposVazios();
    });

});
