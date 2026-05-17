import { render, RenderResult, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CounterComponent } from './counter.component';
describe('CounterComponent', () => {
  describe('Given an initualValue of 10', () => {
    let component: RenderResult<CounterComponent, CounterComponent>;
    const send = jest.fn();

    beforeEach(async () => {
      component = await render(CounterComponent, {
        inputs: {
          initialValue: 10,
        },
        on: {
          send,
        },
      });
      send.mockClear(); // or jest.clearAllMocks() globally in jest config
    });
    test('Then counterValue is 10', async () => {
      expect(await screen.findByText('Counter: 10')).toBeInTheDocument();
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        const user = userEvent.setup();
        const incrementBtn = screen.getByRole('button', {
          name: /increment/i,
        });
        await user.click(incrementBtn);
        await user.click(incrementBtn);
        await user.click(incrementBtn);
        await user.click(incrementBtn);
        await user.click(incrementBtn);

        expect(await screen.findByText('Counter: 15')).toBeInTheDocument();
      });
    });
    describe('When clicking 2 times on decrement button', () => {
      // Shared setup so both the value test AND the send test see the decrements
      beforeEach(async () => {
        const user = userEvent.setup();
        const decrementBtn = screen.getByRole('button', { name: /decrement/i });
        await user.click(decrementBtn);
        await user.click(decrementBtn);
      });
      test('Then counterValue is 8', async () => {
        expect(await screen.findByText('Counter: 8')).toBeInTheDocument();
      });

      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          const user = userEvent.setup();
          const sendBtn = screen.getByRole('button', {
            name: /send/i,
          });
          await user.click(sendBtn);

          expect(send).toHaveBeenCalledWith(8);
        });
      });
    });
  });
});
