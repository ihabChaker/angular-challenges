import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent);
  };
  beforeEach(() => {
    setup();
  });
  test('error modal is displayed if you click on "Confirm" without inputing a name', () => {
    cy.get('input').clear();
    cy.contains('button', 'Confirm').click();

    cy.contains(/error/i).should('be.visible');
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', () => {
    cy.get('input').clear().type('foobar');
    cy.contains('button', 'Confirm').click();
    cy.contains('button', 'Cancel').click();

    cy.contains(/Name is invalid !!/i).should('be.visible');
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', () => {
    let name = 'foobar';
    cy.get('input').clear().type(name);
    cy.contains('button', 'Confirm').click();
    cy.contains('button', 'Confirmation').click();

    cy.contains(/Profil/i).should('be.visible');
    cy.contains(`Name: ${name}`).should('be.visible');
  });
});
