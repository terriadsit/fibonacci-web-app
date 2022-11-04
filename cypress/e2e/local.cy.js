describe('player1 or player 2 is able to win', () => {

  beforeEach(() => {
    cy.visit('/local');
    cy.get('[data-cy="playerName"]').first().type('Test Player1');
    cy.get('[data-cy="name-button"]').first().click();
    cy.get('[data-cy="playerName"]').type('Test Player2');
    cy.get('[data-cy="name-button"]').click();
    cy.get('[data-cy="sticks"]').clear().type('6');
    cy.get('[data-cy="sticks-button"]').click();
  });
  
  
   it('player 1 is able to win', () => {
    cy.get('[data-cy="remove"]').type(1);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="remove"]').type(2);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="remove"]').type(3);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="player1-won"]').should('contain', 'Test Player1 won');
   });

  it('player 2 is able to win', () => {
    cy.get('[data-cy="remove"]').type(2);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="remove"]').type(4);
    cy.get('[data-cy="remove-button"]').click();
    cy.get('[data-cy="player2-won"]').should('contain', 'Test Player2 won');
  });
})