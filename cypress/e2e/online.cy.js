describe('online link visits page and allows 2 users to play each other', () => {
 
  beforeEach(() => {
    cy.visit('/online')
  });
  
  it('asks and displays players name', () => {
    cy.get('[data-cy="playerName"]').type('Player1')
    cy.get('[data-cy="playerName"]').click()
  })

  it('displays other players name', () => {
    
  })

  it('asks and displays players name', () => {
    
  })



  
})