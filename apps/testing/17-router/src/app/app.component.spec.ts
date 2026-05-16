import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

async function perpare() {
  const component = await render(AppComponent, {
    providers: [provideRouter(appRoutes)],
  });
  component.detectChanges();
}

async function searchKeyword(keyword: string) {
  const user = userEvent.setup();

  let searchInput = screen.getByRole('textbox', {
    name: /search book by author or title/i,
  });
  await user.clear(searchInput);
  await user.type(searchInput, keyword);

  let borrowButton = screen.getByRole('button', { name: /borrow/i });
  await user.click(borrowButton);
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await perpare();
  });
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      expect(
        screen.getByText(/search criteria is required!/i),
      ).toBeInTheDocument();

      expect(screen.getByRole('button', { name: /borrow/i })).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await searchKeyword('fsdfsdfsdf');
      expect(
        screen.getByText(/no book found for this search/i),
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await searchKeyword('kill');

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await searchKeyword('kill');

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await searchKeyword('the');

      expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1);
    });
  });
});
