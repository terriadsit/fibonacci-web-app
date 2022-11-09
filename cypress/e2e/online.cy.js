describe('online link visits page and allows 2 users to play each other', () => {
 
  beforeEach(() => {
    cy.visit('/online')
  });
  
  it('asks and displays players name', () => {
    const name = `Cy_${Cypress._.random(1000)}`
    cy.get('[data-cy="playerName"]').type(name)
    cy.get('[data-cy="name-button"]').click()
    cy.get('[data-cy="welcome"]').should('contain',name)
  })

  it('displays other players name', () => {
    
  })

  it('asks and displays players name', () => {
    
  })



  
})