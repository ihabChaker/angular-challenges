import { createOutputSpy } from 'cypress/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  describe('Given an initualValue of 10', () => {
    it('listen to output using createOutputSpy', () => {
      cy.mount(CounterComponent, {
        componentProperties: {
          initialValue: 10,
          send: createOutputSpy<number>('sendSpy'),
        },
      });
      cy.contains('button', 'Send').click();
      cy.get('@sendSpy').should('have.been.calledWith', 10);
    });

    it('listen to output using autoSpyOutputs', () => {
      cy.mount(CounterComponent, {
        autoSpyOutputs: true,
        componentProperties: {
          initialValue: 10,
        },
      });
      cy.contains('button', 'Send').click();
      cy.get('@sendSpy').should('have.been.calledWith', 10);
    });
  });
});
