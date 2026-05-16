import { provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

async function perpare() {
  let component = await render(AppComponent, {
    providers: [provideRouter(appRoutes)],
  });

  component.detectChanges();

  return component;
}
describe('AppComponent', () => {
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      const component = await perpare();
      let errorMessage = component.getByText(/search criteria is required!/i);
      let borrowButton = component.getByRole('button', { name: /borrow/i });

      expect(errorMessage.textContent).toEqual('Search criteria is required!');
      expect(borrowButton.hasAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      const component = await perpare();
      const user = userEvent.setup();

      let searchInput = component.getByRole('textbox', {
        name: /search book by author or title/i,
      });

      await user.type(searchInput, 'glooglglsdlfd');

      let borrowButton = component.getByRole('button', { name: /borrow/i });
      await user.click(borrowButton);

      let messageElement = component.getByText(
        /no book found for this search/i,
      );
      expect(messageElement.textContent).toEqual(
        'No book found for this search',
      );
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      const component = await perpare();
      const user = userEvent.setup();

      let searchInput = component.getByRole('textbox', {
        name: /search book by author or title/i,
      });

      await user.type(searchInput, 'kill');

      let borrowButton = component.getByRole('button', { name: /borrow/i });
      await user.click(borrowButton);

      const listItems = component.getAllByRole('listitem');

      expect(listItems).toHaveLength(1);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      const component = await perpare();
      const user = userEvent.setup();

      let searchInput = component.getByRole('textbox', {
        name: /search book by author or title/i,
      });

      await user.type(searchInput, 'KILL'.toUpperCase());

      let borrowButton = component.getByRole('button', { name: /borrow/i });
      await user.click(borrowButton);

      const listItems = component.getAllByRole('listitem');

      expect(listItems).toHaveLength(1);
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      const component = await perpare();
      const user = userEvent.setup();

      let searchInput = component.getByRole('textbox', {
        name: /search book by author or title/i,
      });

      await user.type(searchInput, 'The');

      let borrowButton = component.getByRole('button', { name: /borrow/i });
      await user.click(borrowButton);

      const listItems = component.getAllByRole('listitem');

      expect(listItems.length).toBeGreaterThan(1);
    });
  });
});
