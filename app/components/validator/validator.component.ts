import {Component, OnInit, Inject, ElementRef} from '@angular/core';
import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ToDoService } from '../../async.service';
import { checkToDoValidator } from '../../async.validator';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
})

export class ValidatorComponent implements OnInit {
  myForm : FormGroup;
  asyncForm : FormGroup;
  nameFormControl: FormControl

  constructor(@Inject(DOCUMENT) private document: Document, private toDoService: ToDoService) {}

  ngOnInit() {
    this.myForm  = new FormGroup({
      phones: new FormArray([new FormControl("+7", [Validators.required, Validators.minLength(9)])]),
    });

    this.nameFormControl = new FormControl(
      '',  [Validators.required, this.nameValidator], [checkToDoValidator.bind(this.toDoService)]
    )
    this.asyncForm  = new FormGroup({
      nameFormControl: this.nameFormControl,
    });
  }

  nameValidator(control: FormControl): {[s:string]:boolean}{
    if(control.value === "1111"){
      return { name: true } 
    } 
    return null; 
  }

  clearValidators(i){
    console.log(this.myForm.controls['phones']['controls'][i])
    this.myForm.controls['phones']['controls'][i].clearValidators();
    this.myForm.controls['phones']['controls'][i].updateValueAndValidity();
    this.checkEvent(i)
    // this.myForm.controls['phones']['controls'].splice(i,1)
  }

  addValidators(i){
    this.myForm.controls['phones']['controls'][i].setValidators([Validators.required, Validators.minLength(9)]);
    this.myForm.controls['phones']['controls'][i].updateValueAndValidity();
    this.checkEvent(i, 'add')
  }

  clearErrorValidators(){
    this.myForm.controls['phones']['controls'].forEach((item, i) => {
      if(item.hasError('required') || item.hasError('minlength') ){
        this.checkEvent(i)

        item.clearValidators();
        item.updateValueAndValidity();
      }
    })
  }

  checkEvent(i, type='remove'){
    const txt = `[id="${i}"]`
    const elem = document.querySelector(txt)

    type === 'remove'
      ? elem.className = elem.className + ' green'
      : elem.classList.remove('green');
  }


  send(){
    this.asyncForm.patchValue({nameFormControl: 11111}, {emitEvent: false});
    // emitEvent установка значения Angular reactive forms не инициировала событие valueChanges

    // this.asyncForm.setValue({nameFormControl: 11111}, {emitEvent: false});
    // Если setValue() передать "неполную" модель, будет сгенерирована ошибка.


  }

  markTouched(){ this.nameFormControl.markAsTouched() }

  addPhone(){
    (<FormArray>this.myForm.controls["phones"]).push(
      new FormControl("+7", [Validators.required, Validators.minLength(9)])
    );
  }
}