import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TodoItem } from '../TodoItem';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTodoItems should return mock data if there is no local storage value', () => {
    let todoList: TodoItem[] = service.getTodoItems();

    expect(todoList).toEqual(service.mockData);
  })

  it('#getTodoItems should get local storage data if it exists', () => {
    const todoData: TodoItem[] = [
      {
        id: '1',
        title: 'Mock Todo Item'
      }
    ]
    localStorage.setItem(service.localStorageKey, JSON.stringify(todoData));

    expect(service.getTodoItems()).toEqual(todoData);
  })

  it('#saveTodoItems should save to local storage', () => {
    const todoData: TodoItem[] = [
      {
        id: '1',
        title: 'Mock Todo Item'
      }
    ]

    service.saveTodoItems(todoData);

    expect(service.getTodoItems()).toEqual(todoData);
  })
});
