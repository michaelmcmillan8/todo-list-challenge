import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.todoItems = [{
      id: '1',
      title: 'Test Item'
    }]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onEditButtonClick should display the edit modal', () => {
    component.selectedId = '1';

    let button = fixture.debugElement.query(By.css('#editButton'));
    button.triggerEventHandler('click', null);

    let editTextBox = fixture.debugElement.query(By.css('#title'));
    expect(editTextBox).toBeTruthy();
  })

  it('#onAddItemClick should add a new todo item', () => {
    let button = fixture.debugElement.query(By.css('.pi-plus'));
    button.triggerEventHandler('click', null);

    let addTextBox = fixture.debugElement.query(By.css('#title'));
    expect(addTextBox).toBeTruthy();

    fixture.detectChanges();

    addTextBox.nativeElement.value = 'Test Item 2';
    addTextBox.nativeElement.dispatchEvent(new Event('input'));

    expect(addTextBox.nativeElement.value).toEqual('Test Item 2');
    let confirmButton = fixture.debugElement.query(By.css('#confirmAddButton'));
    confirmButton.triggerEventHandler('click', null);

    expect(component.todoItems.length).toEqual(2);
  });
  
  it('#onDeleteClick should delete the selected todo item', () => {
    component.selectedId = '1';
    let deleteButton = fixture.debugElement.query(By.css('#deleteButton'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.todoItems.length).toEqual(0);
  })
});
