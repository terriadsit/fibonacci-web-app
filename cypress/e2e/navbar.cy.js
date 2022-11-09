describe('NavBar appears and operates correctly', () => {
  
  before(() => {
    cy.visit('/');
  })
  
  it('links to each page', () => {
   
    cy.get('[data-cy="ai"]').click();
    cy.url().should('include', 'AI');

    cy.get('[data-cy="local"]').click();
    cy.url().should('include', 'local');

    cy.get('[data-cy="login"]').click();
    cy.url().should('include', 'login');

    cy.get('[data-cy="online"]').click();
    cy.url().should('include', 'online');

    cy.get('[data-cy="home"]').click();

  })
})