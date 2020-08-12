import { AbstractControl } from "@angular/forms";
import { tap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";

export function checkToDoValidator(control: AbstractControl){

  return this.checkToDo(control.value)
    .pipe( 
      map(response => { return null }),
      catchError( ()=>  of({todo: true}) )
    );
}
