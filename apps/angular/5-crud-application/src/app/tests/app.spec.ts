import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { BASE_URL, TodoService } from '../services/todo.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;
  let httpTesting: HttpTestingController;

  const todos = [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
    { userId: 1, id: 4, title: 'et porro tempora', completed: true },
    {
      userId: 1,
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [TodoService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;

    await componentFixture.whenStable();
  });

  // BEST PRACTICE: Always verify that no unexpected HTTP requests were made
  afterEach(() => {
    httpTesting.verify();
  });

  it('App component should be defined', () => {
    expect(component).toBeDefined();
  });

  it('App component list initially should be empty', () => {
    expect(component.todos().length).toEqual(0);
  });

  it('should fetch todos from the api and display them', fakeAsync(() => {
    // 1. Use detectChanges() to initialize the component and naturally trigger ngOnInit
    componentFixture.detectChanges();

    // 2. Intercept the request that ngOnInit just fired
    const req = httpTesting.expectOne(BASE_URL, 'Request to load the todos');
    expect(req.request.method).toEqual('GET'); // Good sanity check
    req.flush(todos);

    // 3. Fast-forward the exact duration of your component's timeout
    tick(4000);

    // 4. Run change detection AGAIN to update the DOM with the new signal state
    componentFixture.detectChanges();

    // 5. Assert the logic
    expect(component.loading()).toBeFalsy();

    // 6. Assert the DOM
    const nativeElement: HTMLElement = componentFixture.nativeElement;
    const listLis = nativeElement.querySelectorAll('li');

    expect(listLis.length).toBe(todos.length);
    expect(listLis[0]).toHaveTextContent(todos[0].title);
  }));
});
