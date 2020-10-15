describe('Login user', () => {
  it('Typing data', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('[id="usernameText"]').type('chavita1386@gmail.com');

    cy.get('[id="passwordText"]').type('123456');

    cy.get('#login').submit();

    cy.contains('Welcome to');
  });
});
