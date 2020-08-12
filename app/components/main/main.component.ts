import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})

export class MainComponent {
  name: string;
  email: string;

  onSubmit(form: NgForm){ console.log(this.name, this.email); }
}
