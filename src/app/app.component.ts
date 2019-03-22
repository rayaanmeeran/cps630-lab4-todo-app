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

  /*
  todoList = [
    {
      task: "Buy Oranges",
      complete: false,
      description: "Buy 6 oranges from the store."
    },
    {
      task: "Buy Grapes",
      complete: false,
      description: "Buy a pack of grapes from the store."
    },
    {
      task: "Buy Apples",
      complete: false,
      description: "Buy 3 apples from the store."
    }
  ]*/

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
      if(data.task === this.todoList[i].task){
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
      if(data.task === this.todoList[i].task){
        this.todoList[i].complete = false;
        console.log("Task Not Done.");
        break;
      }
    }
  }

  setDone(data) { 
    for(let i = 0; i < this.todoList.length; i++) {
      if(data.task === this.todoList[i].task){
        this.todoList[i].complete = true;
        console.log("Task Done.");
        break;
      }
    }
  }

}
