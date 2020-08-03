import { Injectable } from '@angular/core';
import { TodoItem } from '../TodoItem';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  mockData: TodoItem[] = [{
    id: Guid.create().toString(),
    title: 'Example Item 1'
  },
  {
    id: Guid.create().toString(),
    title: 'Example Item 2'
  },
  {
    id: Guid.create().toString(),
    title: 'Example Item 3'
  }]

  localStorageKey = 'todo_list';

  constructor() { }

  getTodoItems(): TodoItem[] {
    let todoString = localStorage.getItem(this.localStorageKey);
    
    if(!todoString){
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.mockData));
      return this.mockData;
    }
    else{
      return JSON.parse(todoString);
    }
  }

  saveTodoItems(items: TodoItem[]): void{
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }
}
