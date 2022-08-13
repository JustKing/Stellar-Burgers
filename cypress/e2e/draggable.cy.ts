/// <reference types="cypress" />

import getIngredients from '../fixtures/constructor.fixture';
import dragIgredients from '../fixtures/drag-ingredients.fixture';

describe('Check dragging ingredients to constructor', () => {
  getIngredients();

  it('Should drag bun, main and sauce to constructor', () => {
    cy.wait('@ingredients');
    cy.wait(100);
    dragIgredients();
    cy.get('#constructor > div').first().find('span.constructor-element__row > img').should('be.visible');
    cy.get('#constructor > div').eq(1).find('div[draggable=true]').should('have.length', 2);
  });
});

export {};
