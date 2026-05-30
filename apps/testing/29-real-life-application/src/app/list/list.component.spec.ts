import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { render, screen, within } from '@testing-library/angular';
import {
  createMockWithValues,
  Mock,
} from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { firstValueFrom, of, throwError } from 'rxjs';
import { APP_ROUTES } from '../app.route';
import { BackendService } from '../backend.service';
import { ListComponent } from './list.component';
import { TicketStore } from './ticket.store';

const USERS = [
  { id: 1, name: 'titi' },
  { id: 2, name: 'george' },
];
const TICKETS = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: false,
  },
  {
    id: 1,
    description: 'Coucou',
    assigneeId: 1,
    completed: false,
  },
];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let backendServiceMock: Mock<BackendService>;
  let store: TicketStore;

  async function setup() {
    jest.clearAllMocks();

    const fakeServiceObj = createMockWithValues(BackendService, {
      tickets: jest.fn(),
      users: jest.fn(),
      assign: jest.fn(),
      complete: jest.fn(),
    });

    fakeServiceObj.tickets.mockReturnValue(of(TICKETS));
    fakeServiceObj.users.mockReturnValue(of(USERS));
    const { fixture } = await render(ListComponent, {
      providers: [
        {
          provide: BackendService,
          useValue: fakeServiceObj,
        },
        // provideComponentStore(TicketStore),
        provideRouter(APP_ROUTES),
      ],
    });

    return {
      fakeServiceObj,
      fixture,
      store: fixture.debugElement.injector.get(TicketStore),
    };
  }

  beforeEach(async () => {
    jest.resetAllMocks();

    const setupResult = await setup();
    fixture = setupResult.fixture;
    component = fixture.componentInstance;
    backendServiceMock = setupResult.fakeServiceObj;
    store = setupResult.store;
  });

  describe('Given Install inside the search input', () => {
    it('Then one row is visible', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByRole('textbox', {
        name: /search/i,
      });

      await user.clear(searchInput);
      await user.type(searchInput, 'Install');

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('When typing a description and clicking on add a new ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then ticket with the description is added to the list with unassigned status', async () => {
        const TICKET_DESCRIPTION = 'rando';
        const TICKET = {
          id: 99,
          description: TICKET_DESCRIPTION,
          assigneeId: null,
          completed: false,
        };
        backendServiceMock.newTicket.mockReturnValue(of(TICKET));

        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox', {
          name: /search/i,
        });
        await user.clear(searchInput);

        const descriptionInput = screen.getByRole('textbox', {
          name: /description/i,
        });
        await user.clear(descriptionInput);
        await user.type(descriptionInput, TICKET_DESCRIPTION);

        const addTicketBtn = screen.getByText(/add new ticket/i);
        await user.click(addTicketBtn);

        expect(screen.getByText(TICKET_DESCRIPTION)).toBeInTheDocument();

        const tickets = await firstValueFrom(store.tickets$.pipe());
        expect(
          tickets.find((ticket) => ticket.description == TICKET_DESCRIPTION),
        ).toHaveProperty('description', TICKET_DESCRIPTION);
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const ERROR_MESSAGE = 'Unkown API error';
        backendServiceMock.newTicket.mockReturnValue(
          throwError(() => new Error(ERROR_MESSAGE)),
        );

        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox', {
          name: /search/i,
        });
        await user.clear(searchInput);

        const descriptionInput = screen.getByRole('textbox', {
          name: /description/i,
        });
        await user.clear(descriptionInput);
        await user.type(descriptionInput, 'FSDF');

        const addTicketBtn = screen.getByText(/add new ticket/i);
        await user.click(addTicketBtn);

        expect(
          screen.getByText(new RegExp(ERROR_MESSAGE, 'i')),
        ).toBeInTheDocument();
      });
    });
  });

  describe('When assigning first ticket to george', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is assigned to George', async () => {
        backendServiceMock.assign.mockReturnValue(
          of({ ...TICKETS[0], assigneeId: 2 }),
        );

        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox', {
          name: /search/i,
        });
        await user.clear(searchInput);

        const ticketItems = await screen.findAllByRole('listitem');
        await user.click(
          within(ticketItems[0]).getByRole('combobox', {
            name: 'Assign to',
          }),
        );
        await user.click(screen.getByText(/george/i));
        await user.click(
          within(ticketItems[0]).getByRole('button', {
            name: 'Assign',
          }),
        );
        const tickets = await firstValueFrom(store.tickets$.pipe());
        expect(tickets.find((ticket) => ticket.id === 0)).toHaveProperty(
          'assigneeId',
          2,
        );
        expect(tickets.find((ticket) => ticket.id === 0)).toHaveProperty(
          'assignee',
          'george',
        );
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const ERROR_MESSAGE = 'could not assign the ticket';
        backendServiceMock.assign.mockReturnValue(
          throwError(() => new Error(ERROR_MESSAGE)),
        );

        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox', {
          name: /search/i,
        });
        await user.clear(searchInput);

        const ticketItems = await screen.findAllByRole('listitem');
        await user.click(
          within(ticketItems[0]).getByRole('combobox', {
            name: 'Assign to',
          }),
        );
        await user.click(screen.getByText(/george/i));
        await user.click(
          within(ticketItems[0]).getByRole('button', {
            name: 'Assign',
          }),
        );

        expect(
          screen.getByText(new RegExp(ERROR_MESSAGE, 'i')),
        ).toBeInTheDocument();
      });
    });
  });

  describe('When finishing first ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is done', async () => {
        backendServiceMock.complete.mockReturnValue(
          of({ ...TICKETS[0], completed: true }),
        );
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox', {
          name: /search/i,
        });
        await user.clear(searchInput);

        const ticketItems = await screen.findAllByRole('listitem');
        await user.click(
          within(ticketItems[0]).getByRole('button', {
            name: 'Done',
          }),
        );

        const tickets = await firstValueFrom(store.tickets$.pipe());
        expect(tickets.find((ticket) => ticket.id === 0)).toHaveProperty(
          'completed',
          true,
        );
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const ERROR_MESSAGE = "could not update the ticket's complete status";
        backendServiceMock.complete.mockReturnValue(
          throwError(() => new Error(ERROR_MESSAGE)),
        );

        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox', {
          name: /search/i,
        });
        await user.clear(searchInput);

        const ticketItems = await screen.findAllByRole('listitem');
        await user.click(
          within(ticketItems[0]).getByRole('button', {
            name: 'Done',
          }),
        );

        expect(
          screen.getByText(new RegExp(ERROR_MESSAGE, 'i')),
        ).toBeInTheDocument();
      });
    });
  });

  describe('When clicking on first ticket', () => {
    it('Then we navigate to detail/0', async () => {
      const user = userEvent.setup();

      const ticketItems = await screen.findAllByRole('listitem');
      await user.click(
        within(ticketItems[0]).getByRole('button', {
          name: 'Ticket: 0 Description: Install a monitor arm Assignee: titi Done: false',
        }),
      );
      const location = TestBed.inject(Location);
      expect(location.path()).toBe('/detail/0');
    });
  });
});
