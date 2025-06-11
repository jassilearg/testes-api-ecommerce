describe("auth", () => {
  // Sign Up
  it("deve cadastrar usuário com sucesso ao inserir dados válidos", () => {
    cy.cadastrarUsuario()
  })

  it("não deve permitir o cadastro de usuário com campos vazios", () => {
    cy.cadastrarUsuarioCamposVazios()
  })

  it("não deve permitir o cadastro de usuário com email inválido", () => {
    cy.cadastrarUsuarioComEmailInvalido()
  })

  it("não deve permitir o cadastro de usuário com senha fraca", () => {
    cy.cadastrarUsuarioComSenhaFraca()
  })

  // Sign In
  it("deve logar  usuário com sucesso ao inserir dados válidos", () => {
    cy.logarUsuario()
  })

  it("não deve permitir o login de usuário com email inválido", () => {
    cy.loginUsuarioEmailInvalido()
  })

  it("não deve permitir o login de usuário não cadastrado", () => {
    cy.loginUsuarioDadosNaoCadastrados()
  })

  it("não deve permitir o login de usuário com email não confirmado", () => {
    cy.loginUsuarioEmailNaoConfirmado()
  })
})
