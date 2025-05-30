describe('autenticação', () => {
  it('deve cadastrar usuário com sucesso ao inserir dados válidos ', () => {
    cy.cadastrarUsuario();
  });

  it('deve logar  usuário com sucesso ao inserir dados válidos ', () => {
    cy.logarUsuario();
  });
});
