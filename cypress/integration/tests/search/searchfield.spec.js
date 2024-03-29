describe('Search field homepage test', () => {
  it('Test the redirect of the search field', () => {
    cy.visit('/');
    cy.get('#outlined-with-placeholder').type('Pirates {enter}');
    cy.url().should('eq', 'http://localhost:3000/search/Pirates');
  });
  it('Checks the content of the search page after search', () => {
    cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', 'Pirates of the Caribbean: The Curse of the Black Pearl');
    cy.get('.MuiGrid-container > :nth-child(7)').should('contain.text', 'Pirates of the Great Salt Lake');
    cy.get('.MuiGrid-container').children().should('have.length', 10);
  });
});

describe('Search field header tests', () => {
  it('Test the redirect of the search field in the header', () => {
    cy.visit('/');
    cy.get('.MuiInputBase-input').type('nolan{enter}');
    cy.url().should('eq', 'http://localhost:3000/search/nolan');
  });
  it('Checks the content of the search page after search', () => {
    cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', 'The Dark Knight');
    cy.get('.MuiGrid-container > :nth-child(3)').should('contain.text', 'Interstellar');
    cy.get('.MuiGrid-container > :nth-child(9)').should('contain.text', 'Insomnia');
    cy.get('.MuiGrid-container').children().should('have.length', 12);
  });
});
