describe('autenticação', () => {
  it('deve cadastrar usuário com sucesso ao inserir dados válidos', () => {
    cy.cadastrarUsuario();
  });

  it('deve logar  usuário com sucesso ao inserir dados válidos', () => {
    cy.logarUsuario();
  });

  it('não deve permitir o cadastro de usuário com campos vazios', () => {
    cy.cadastrarUsuarioCamposVazios();
  });

  it('não deve permitir o login de usuário não cadastrado', () => {
    cy.loginUsuarioDadosNaoCadastrados();
  });
});
