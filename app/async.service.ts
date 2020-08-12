import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

  @Injectable({providedIn: 'root'})
    export class ToDoService {
      
      constructor(private http: HttpClient) {}
    
      checkToDo(value: number | string): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/todos/' + value);
      }
    }
    