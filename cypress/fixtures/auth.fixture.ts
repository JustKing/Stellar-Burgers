const auth = () => {
  cy.get('input[type=email]').type('cy-user@stellar-burger.com');
  cy.get('input[type=password]').type('cy-user-v3ry-str0n9-pa22w0rd!');
  cy.get('form').submit();
};

export default auth;
