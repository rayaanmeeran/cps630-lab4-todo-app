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

  incompleteList = this.todoList;
  completedList = [];


  addTodo(title, desc) {
    let duplicate = this.checkDuplicate(title);
    if (duplicate === true){
      confirm("You already have a Todo named " + title + ".");
    }
    else if(this.isEmpty(title) === false){
        this.incompleteList.push({
        task: title,
        complete: false,
        description: desc,
        
      });
    }
  }

  deleteIncomplete(data) {
    for(let i = 0; i < this.incompleteList.length; i++) {
      if(data.task === this.incompleteList[i].task){
        this.incompleteList.splice(i, 1);
        console.log("Deleted.");
        break;
      }
    }
  }

  deleteComplete(data) {
    for(let i = 0; i < this.completedList.length; i++) {
      if(data.task === this.completedList[i].task){
        this.completedList.splice(i, 1);
        console.log("Deleted.");
        break;
      }
    }
  }

  checkDuplicate(titleInput) {
    for(let i = 0; i < this.incompleteList.length; i++) {
      if(titleInput === this.incompleteList[i].task){
        return true;
      } 
    }
    return false;
  }

  isEmpty(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
 
  /*
  setNotDone(data) { 
    for(let i = 0; i < this.todoList.length; i++) {
      if(data.task === this.todoList[i].task){
        this.todoList[i].complete = false;
        console.log("Task Not Done.");
        break;
      }
    }
  }*/

  setDone(data) { 
    for(let i = 0; i < this.incompleteList.length; i++) {
      if(data.task === this.incompleteList[i].task){
        this.incompleteList[i].complete = true;
        this.completedList.push(this.incompleteList[i]);
        this.incompleteList.splice(i, 1);
        console.log("Task Done.");
        break;
      }
    }
  }

  checkCompleted(data) {
    if(data.complete === true) {

    }
  }

  onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    
    if (e.dataTransfer.items) {
          var file = e.dataTransfer.items[0].getAsFile();

          let fileReader = new FileReader();
          fileReader.onload = (e) => {
            let newJSONString = fileReader.result.toString(); // Changing the file data to a String
            console.log(newJSONString);
            let newJSONObj = JSON.parse(newJSONString); // Parsing the String 
            console.log(newJSONObj);
            this.incompleteList = newJSONObj.todo;
          }
          fileReader.readAsText(file);
    } else {
      console.error("There was an error with the file drop.");
    }
  }
}
