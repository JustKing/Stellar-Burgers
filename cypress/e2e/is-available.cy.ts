/// <reference types="cypress" />

import getIngredients from '../fixtures/constructor.fixture';

describe('Available constructor', () => {
  getIngredients();

  it('Shoud open burger constructor', () => {
    cy.get('main > div > p').should('have.text', 'Соберите бургер');
  });

  it('Should have a buns', () => {
    cy.wait('@ingredients');
    cy.get('section#bun > div > div').should('have.length', 2);
  });

  it('Should have a mains', () => {
    cy.wait('@ingredients');
    cy.get('section#main > div > div').should('have.length', 3);
  });

  it('Should have a sauces', () => {
    cy.wait('@ingredients');
    cy.get('section#sauce > div > div').should('have.length', 2);
  });
});

export {};
