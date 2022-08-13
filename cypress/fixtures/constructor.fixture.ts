const getIngredients = () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
    cy.visit('http://localhost:3000/');
  });
};

export default getIngredients;
