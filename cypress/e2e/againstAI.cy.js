describe('player is able to win or to lose against ai', () => {

  beforeEach(() => {
    cy.visit('/againstAI');
    cy.get('[data-cy="playerName"]').type('Test Player');
    cy.get('[data-cy="name-button"]').click();
    cy.get('[data-cy="sticks"]').clear().type('6');
    cy.get('[data-cy="sticks-button"]').click();
  });
  
  
  it('player is able to win', () => {
    cy.get('[data-cy="remove"]').type(1);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="remove"]').type(3);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="player1-won"]').should('contain', 'Test Player won');
  });

  it('player is able to lose', () => {
    cy.get('[data-cy="remove"]').type(2);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="player2-won"]').should('contain', 'A.I. Fibi won');
  });
})