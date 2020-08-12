import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
})

export class ThirdComponent implements OnInit {
  myForm : FormGroup;
  nameFormControl: FormControl
  emailFormControl: FormControl

  constructor() {}

  ngOnInit() {
    this.nameFormControl = new FormControl('',  [Validators.required, Validators.minLength(2)])
    this.emailFormControl = new FormControl('',  [Validators.required, Validators.email])

    this.myForm  = new FormGroup({
      nameFormControl: this.nameFormControl,
      emailFormControl: this.emailFormControl,
      phones: new FormArray([new FormControl("+7", [Validators.required, Validators.minLength(9)])]),
    });
  }

  onSubmit(form: FormGroup){ console.log(form); }

  addPhone(){
    (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+7", [Validators.required, Validators.minLength(9)]));
  }
}