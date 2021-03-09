import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { tap} from 'rxjs/operators';

export interface Todo {
    id: number,
    title: string,
    completed: boolean,
    date?: any
  }

@Injectable({providedIn: 'root'})
export class TodosService {

    public todos: Todo [] =[];

      constructor (private http: HttpClient) {}

      fetchTodos ():Observable<Todo[]> {
        return this.http.get<Todo[]> ('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .pipe( 
          tap (item => this.todos = item)
          )
      }

      onToggle(id:number) {

        // this.todos.forEach (item => {
        //   if (item.id == id) { item.completed = !item.completed}
        // })
    
        const index = this.todos.findIndex (item => item.id === id);
        this.todos[index].completed = ! this.todos[index].completed;
    }

    removeTodo(id:number) {
        this.todos =this.todos.filter (item => item.id != id);
      }

      addTodo (addTodo:Todo) {
        this.todos.push (addTodo);
      }


}