import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await render(AppComponent);
  });
  test('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    let user = userEvent.setup();

    let input = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.clear(input);

    let submitBtn = screen.getByRole('button', {
      name: /confirm/i,
    });
    await user.click(submitBtn);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    let user = userEvent.setup();

    let input = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.clear(input);
    await user.type(input, 'foobar');

    let submitBtn = screen.getByRole('button', {
      name: /confirm/i,
    });
    await user.click(submitBtn);

    let cancelBtn = screen.getByRole('button', {
      name: /cancel/i,
    });
    await user.click(cancelBtn);

    expect(await screen.findByText(/Name is invalid !!/i)).toBeInTheDocument();
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    let user = userEvent.setup();

    let input = screen.getByRole('textbox', {
      name: /name/i,
    });
    await user.clear(input);
    await user.type(input, 'foobar');

    let submitBtn = screen.getByRole('button', {
      name: /confirm/i,
    });
    await user.click(submitBtn);

    let confirmationBtn = screen.getByRole('button', {
      name: /Confirmation/i,
    });
    await user.click(confirmationBtn);

    expect(
      await screen.findByText(/Name has been submitted/i),
    ).toBeInTheDocument();
  });
});
