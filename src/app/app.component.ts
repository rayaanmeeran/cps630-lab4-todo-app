import { Component } from '@angular/core';
import todos from '../todo.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO APP';
  todoList = todos.todo;

  addTodo(title, desc) {
    let duplicate = this.checkDuplicate(title);
    if (duplicate === true){
      confirm("You already have a Todo named " + title + ".");
    }
    else if(this.isEmpty(title) === false){
        this.todoList.push({
        task: title,
        complete: false,
        description: desc,
        
      });
    }
  }

  delete(data) {
    for(let i = 0; i < this.todoList.length; i++) {
      if(data.title === this.todoList[i].task){
        this.todoList.splice(i, 1);
        console.log("Deleted.");
        break;
      }
    }
  }

  checkDuplicate(titleInput) {
    for(let i = 0; i < this.todoList.length; i++) {
      if(titleInput === this.todoList[i].task){
        return true;
      } 
    }
    return false;
  }

  isEmpty(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  setNotDone(data) { 
    for(let i = 0; i < this.todoList.length; i++) {
      if(data.title === this.todoList[i].task){
        this.todoList[i].complete = false;
        console.log("Task Not Done.");
        break;
      }
    }
  }

  setDone(data) { 
    for(let i = 0; i < this.todoList.length; i++) {
      if(data.title === this.todoList[i].task){
        this.todoList[i].complete = true;
        console.log("Task Done.");
        break;
      }
    }
  }

}
