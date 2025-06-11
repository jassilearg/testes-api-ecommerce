describe('orders', () => {
    it('deve permitir usuário criar uma ordem com dados válidos', () => {
        cy.criarOrdemDadosValidos();
    });

    it('não deve permitir usuário criar uma ordem com pedido de id inválido', () => {
        cy.criarOrdemIdInvalido();
    });
});
