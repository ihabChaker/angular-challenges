import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe('ChildComponent', () => {
  let httpServiceMock = {
    sendTitle: jest.fn(),
  };

  beforeEach(async () => {
    const component = await render(ChildComponent, {
      providers: [
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    });
    component.detectChanges();
  });
  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      const user = userEvent.setup();

      let input = screen.getByRole('textbox');
      await user.clear(input);

      let btn = screen.getByRole('button', { name: /validate/i });
      await user.click(btn);

      expect(screen.getByText(/Title is required !!!/i)).toBeInTheDocument();
      expect(httpServiceMock.sendTitle).not.toHaveBeenCalled();
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      const user = userEvent.setup();

      let input = screen.getByRole('textbox');
      await user.clear(input);

      const title = 'Good';
      await user.type(input, title);

      let btn = screen.getByRole('button', { name: /validate/i });
      await user.click(btn);

      expect(screen.getByText(/Title is Good/i)).toBeInTheDocument();
      expect(httpServiceMock.sendTitle).toHaveBeenCalledWith(title);
    });
  });
});
