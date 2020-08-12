import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
})
export class FourthComponent implements OnInit {
  myForm : FormGroup;
  nameFormControl: FormControl
  emailFormControl: FormControl
  phones: FormArray

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.nameFormControl = new FormControl('',  [Validators.required, Validators.minLength(2)])
    this.emailFormControl = new FormControl('',  [Validators.required, Validators.email])
    this.phones = this.formBuilder.array([new FormControl("+7", [Validators.required, Validators.minLength(9)])]),

    this.myForm  = this.formBuilder.group({
      nameFormControl: this.nameFormControl,
      emailFormControl: this.emailFormControl,
      phones:  this.phones,
    });
  }

  onSubmit(form: FormGroup){ console.log(form); }

    addPhone(){
    (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+7", [Validators.required, Validators.minLength(9)]));
  }
}