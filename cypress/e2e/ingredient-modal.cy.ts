/// <reference types="cypress" />

import getIngredients from '../fixtures/constructor.fixture';

describe('Check ingredient modals', () => {
  getIngredients();

  it('Should empty modal-root', () => {
    cy.get('div#modal-root > div').should('have.length', 0);
  });

  it('Shoud open bun ingredient modal', () => {
    cy.get('section#bun > div > div').first().click();
    cy.wait(100);
    cy.get('div#modal-root > div').should('have.length', 2);
  });

  it('Should have content', () => {
    cy.get('section#bun > div > div').first().click();
    cy.wait(100);
    cy.get('div#modal-root > div p').first().should('have.text', 'Детали ингредиента');
    cy.get('div#modal-root > div img').should('be.visible');
    cy.get('div#modal-root > div p').eq(1).should('have.text', 'Краторная булка N-200i');
  });

  it('Should close modal', () => {
    cy.get('section#bun > div > div').first().click();
    cy.wait(100);
    cy.get('div#modal-root > div').should('have.length', 2);
    cy.get('div#modal-root > div div.pointer').click();
    cy.wait(100);
    cy.get('div#modal-root > div').should('have.length', 0);
  });
});

export {};
