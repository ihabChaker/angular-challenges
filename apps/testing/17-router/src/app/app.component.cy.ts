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

  function searchKeyword(keyword: string) {
    cy.screenshot('gog');
    cy.get('#bookName').clear().type(keyword);
    cy.get('[data-cy="borrow-btn"]').click();
  }
  beforeEach(() => {
    setup();
  });

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', () => {
      cy.contains('Search criteria is required!');
      cy.get('[data-cy="borrow-btn"]').should('have.attr', 'disabled');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      searchKeyword('sfsdfsd');

      cy.contains('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      searchKeyword('kill');

      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      searchKeyword('kill'.toUpperCase());

      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', () => {
      searchKeyword('The');

      cy.get('li').should('have.length.greaterThan', 1);
    });
  });
});
