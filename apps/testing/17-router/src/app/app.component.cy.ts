import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe(AppComponent.name, () => {
  function setup() {
    cy.mount(AppComponent, {
      providers: [provideRouter(appRoutes)],
    });
    // Necessary for directing the process to the search page
    cy.get('a').click();
  }

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', () => {
      setup();

      cy.contains('Search criteria is required!');
      cy.get('[data-cy="borrow-btn"]').should('have.attr', 'disabled');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      setup();

      cy.get('#bookName').clear().type('glfdkglfdkl');
      cy.get('[data-cy="borrow-btn"]').click();

      cy.contains('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      setup();

      cy.get('#bookName').clear().type('kill');
      cy.get('[data-cy="borrow-btn"]').click();

      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      setup();

      cy.get('#bookName').clear().type('kill'.toUpperCase());
      cy.get('[data-cy="borrow-btn"]').click();

      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', () => {
      setup();

      cy.get('#bookName').clear().type('The'.toUpperCase());
      cy.get('[data-cy="borrow-btn"]').click();

      cy.get('li').should('have.length.greaterThan', 1);
    });
  });
});
