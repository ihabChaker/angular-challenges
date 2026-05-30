import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { APP_ROUTES } from '../../app.route';
import { TicketUser, User } from '../../backend.service';
import { RowComponent } from './row.component';

const USERS = [
  { id: 1, name: 'titi' },
  { id: 2, name: 'George' },
];
const TICKET_NOT_ASSIGNED = {
  id: 0,
  description: 'Install a monitor arm',
  assignee: 'unassigned',
  completed: false,
};

const TICKET_ASSIGNED = {
  id: 1,
  description: 'Install a monitor arm',
  assignee: 'titi',
  completed: false,
};

describe('RowComponent', () => {
  async function setup(users: User[], ticket: TicketUser) {
    const closeTicket = jest.fn();
    const assign = jest.fn();
    const component = await render(RowComponent, {
      inputs: {
        ticket,
        users,
      },
      on: {
        closeTicket,
        assign,
      },
      providers: [provideRouter(APP_ROUTES)],
    });

    return { component, closeTicket, assign };
  }

  describe('Given an unassigned ticket', () => {
    describe('When we assign it to titi', () => {
      it('Then assign event is emitted with ticketId 0 and userId 1', async () => {
        const { assign } = await setup(USERS, TICKET_NOT_ASSIGNED);
        const user = userEvent.setup();

        await user.click(screen.getByText(/assign to/i));
        await user.click(screen.getByText(/titi/i));
        await user.click(screen.getByText('Assign'));

        expect(assign).toHaveBeenCalledWith({ userId: 1, ticketId: 0 });
      });
    });
  });

  describe('Given an assigned ticket', () => {
    describe('When we click the done button', () => {
      it('Then closeTicket event is emitted with ticketId 1 ', async () => {
        const { closeTicket, component } = await setup(USERS, TICKET_ASSIGNED);
        const user = userEvent.setup();

        await user.click(screen.getByText('Done'));

        expect(closeTicket).toHaveBeenCalledWith(TICKET_ASSIGNED.id);
      });
    });
  });

  describe('When clicking on ticket', () => {
    it('Then navigation should be triggered with url detail/0', async () => {
      const { component } = await setup(USERS, TICKET_NOT_ASSIGNED);
      const location = TestBed.inject(Location);
      const user = userEvent.setup();

      await user.click(
        screen.getByRole('button', {
          name: /ticket: /i,
        }),
      );
      expect(location.path()).toBe('/detail/0');
    });
  });
});
