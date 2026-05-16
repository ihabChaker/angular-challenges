import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe('ChildComponent', () => {
  let httpService = new HttpService();
  let spy: Cypress.Agent<sinon.SinonSpy>;

  const setup = () => {
    spy = cy.spy(httpService, 'sendTitle');

    cy.mount(ChildComponent, {
      providers: [
        {
          provide: HttpService,
          useValue: httpService,
        },
      ],
    });
  };

  beforeEach(() => {
    setup();
  });
  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      cy.get('input').clear();
      cy.get('button').click();

      cy.contains('Title is required');
      cy.wrap(spy).should('not.be.called');
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      let title = 'Good';
      cy.get('input').clear().type(title);
      cy.get('button').click();

      cy.contains('Title is ' + title);
      cy.wrap(spy).should('be.calledWith', title);
      // expect(spy).to.be.calledWith(title);
    });
  });
});
