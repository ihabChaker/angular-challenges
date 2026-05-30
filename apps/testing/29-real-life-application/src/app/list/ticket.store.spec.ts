import { provideComponentStore } from '@ngrx/component-store';
import { render } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { firstValueFrom, of, throwError } from 'rxjs';
import { BackendService, TicketUser } from '../backend.service';
import { TicketStore } from './ticket.store';
const TICKETS = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 111,
    completed: false,
  },
];
const USERS = [
  {
    id: 111,
    name: 'foo',
  },
];
const NEW_TICKET = {
  id: 1,
  description: 'Assemble the table parts',
  assigneeId: 111,
  completed: false,
  assignee: 'foo',
};

describe('TicketStore', () => {
  async function setup(
    users = USERS,
    tickets = TICKETS,
    usersStatus: string = 'success',
  ) {
    const fakeService = createMockWithValues(BackendService, {
      tickets: jest.fn(),
      users: jest.fn(),
      newTicket: jest.fn(),
    });

    fakeService.tickets.mockReturnValue(of(tickets));
    if (usersStatus === 'success') {
      fakeService.users.mockReturnValue(of(users));
    } else {
      fakeService.users.mockReturnValue(throwError(() => new Error('IDK')));
    }

    const { debugElement } = await render('', {
      providers: [
        { provide: BackendService, useValue: fakeService },
        provideComponentStore(TicketStore),
      ],
    });

    return { store: debugElement.injector.get(TicketStore), fakeService };
  }
  describe('When init', () => {
    it('Then calls backend.tickets', async () => {
      const { fakeService } = await setup();

      expect(fakeService.tickets).toHaveBeenCalled();
    });

    it('Then calls backend.users', async () => {
      const { fakeService } = await setup();

      expect(fakeService.users).toHaveBeenCalled();
    });

    describe('Given all api returns success response', () => {
      it('Then tickets and users should be merged ', async () => {
        const { store } = await setup();
        const tickets = await firstValueFrom(store.tickets$);

        expect((tickets.at(0) as unknown as TicketUser).assignee).toBe('foo');
      });
    });

    describe('Given users api returns failure response', () => {
      it('Then tickets should not have any assignee', async () => {
        const { store } = await setup(USERS, TICKETS, 'faillure');
        const tickets = await firstValueFrom(store.tickets$);

        expect(tickets.at(0)).toEqual(TICKETS[0]);
      });
    });

    describe('When adding a new ticket with success', () => {
      it('Then ticket is added to the list', async () => {
        const { store, fakeService } = await setup();
        fakeService.newTicket.mockReturnValue(of(NEW_TICKET));
        store.addTicket('girggy');

        const tickets = await firstValueFrom(store.tickets$);

        expect(tickets).toHaveLength(TICKETS.length + 1);
        expect(tickets).toContainEqual(NEW_TICKET);
      });
    });
  });
});
