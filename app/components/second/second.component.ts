import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
})
export class SecondComponent implements OnInit {
  myForm : FormGroup;
  nameFormControl: FormControl
  emailFormControl: FormControl

  constructor() {}

  ngOnInit() {
    this.nameFormControl = new FormControl('',  [Validators.required, Validators.minLength(2), this.nameValidator])
    this.emailFormControl = new FormControl('',  [Validators.required, Validators.email])
    this.myForm = new FormGroup({
      nameFormControl: this.nameFormControl,
      emailFormControl: this.emailFormControl
    });
  }

  nameValidator(control: FormControl): {[s:string]:boolean}{
    if(control.value === "111"){
      return { name: true } 
    } 
    return null; 
  }

  onSubmit(form: FormGroup){ console.log(form); }
}

