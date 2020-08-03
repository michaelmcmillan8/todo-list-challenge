import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/TodoItem';
import { TodoService } from '../../services/todo.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  showAddDialog = false;
  showEditDialog = false;
  showHelpDialog = false;
  
  newItemTitle: string;

  editingItem: TodoItem;
  editingTitle = '';

  selectedId: string;

  todoItems: TodoItem[] = []

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoItems = this.todoService.getTodoItems();
  }

  onEditButtonClick(){
    this.editingItem = this.getSelectedItem();
    this.editingTitle = this.editingItem.title;

    this.showEditDialog = true;
  }

  onAddItemClick(){
    this.todoItems.push({
      id: Guid.create().toString(),
      title: this.newItemTitle
    });

    this.todoService.saveTodoItems(this.todoItems);

    this.newItemTitle = '';
    this.showAddDialog = false;
  }

  onEditItemClick(){
    this.editingItem.title = this.editingTitle;

    this.todoService.saveTodoItems(this.todoItems);

    this.showEditDialog = false;
  }

  onDeleteClick(){
    let selectedItem = this.getSelectedItem();
    
    this.todoItems.splice(this.todoItems.indexOf(selectedItem), 1);

    this.todoService.saveTodoItems(this.todoItems);
  }

  getSelectedItem(): TodoItem{
    return this.todoItems.find(item => {
      return item.id === this.selectedId
    });
  }
}
