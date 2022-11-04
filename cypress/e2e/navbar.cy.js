describe('NavBar appears and operates correctly', () => {
  
  before(() => {
    cy.visit('/');
  })
  
  it('links to each page', () => {
   
    cy.get('[data-cy="directions"]').click();
    cy.url().should('include', '/directions');

    cy.get('[data-cy="ai"]').click();
    cy.url().should('include', 'AI');

    cy.get('[data-cy="local"]').click();
    cy.url().should('include', 'local');

    cy.get('[data-cy="online"]').click();
    cy.url().should('include', 'online');

    cy.get('[data-cy="home"]').click();

  })
})