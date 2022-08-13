const dragIgredients = () => {
  const dataTransfer = new DataTransfer();

  cy.get('section#bun > div > div').first().trigger('dragstart', { dataTransfer });
  cy.get('#constructor > div').first().trigger('drop', { dataTransfer });
  cy.get('section#bun > div > div').first().trigger('dragend');

  cy.get('section#main > div > div').first().trigger('dragstart', { dataTransfer });
  cy.get('#constructor > div').eq(1).trigger('drop', { dataTransfer });
  cy.get('section#main > div > div').first().trigger('dragend');

  cy.get('section#sauce > div > div').first().trigger('dragstart', { dataTransfer });
  cy.get('#constructor > div').eq(1).trigger('drop', { dataTransfer });
  cy.get('section#sauce > div > div').first().trigger('dragend');
};

export default dragIgredients;
