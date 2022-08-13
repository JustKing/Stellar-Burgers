const postOrder = () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
  });
};

export default postOrder;
