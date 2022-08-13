/// <reference types="cypress" />

import auth from '../fixtures/auth.fixture';
import getIngredients from '../fixtures/constructor.fixture';
import dragIgredients from '../fixtures/drag-ingredients.fixture';
import postOrder from '../fixtures/order.fixture';

describe('Check order modal', () => {
  getIngredients();
  postOrder();

  it('Should empty modal-root', () => {
    cy.get('div#modal-root > div').should('have.length', 0);
  });

  it('Should open order modal', () => {
    cy.wait('@ingredients');
    dragIgredients();
    cy.get('#constructor + div button').click();
    auth();
    cy.get('#constructor + div button').click();
    cy.wait('@order');
    cy.get('div#modal-root > div').should('have.length', 2);
  });

  it('Should have content', () => {
    cy.wait('@ingredients');
    dragIgredients();
    cy.get('#constructor + div button').click();
    auth();
    cy.get('#constructor + div button').click();
    cy.wait('@order');
    cy.get('div#modal-root > div p').should(
      'have.text',
      '22идентификатор заказаВаш заказ начали готовитьДождитесь готовности на орбитальной станции'
    );
  });

  it('Should close modal', () => {
    cy.wait('@ingredients');
    dragIgredients();
    cy.get('#constructor + div button').click();
    auth();
    cy.get('#constructor + div button').click();
    cy.wait('@order');
    cy.get('div#modal-root > div').should('have.length', 2);
    cy.get('div#modal-root > div div.pointer').click();
    cy.wait(100);
    cy.get('div#modal-root > div').should('have.length', 0);
  });
});

export {};
