describe('orders', () => {
    it('não deve permitir usuário criar uma ordem com pedido de id inválido', () => {
        cy.criarOrdemIdInvalido();
    });
});
