import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from './modules/material.module';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { FourthComponent } from './components/fourth/fourth.component';
import { ValidatorComponent } from './components/validator/validator.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'second', component: SecondComponent},
  { path: 'third', component: ThirdComponent},
  { path: 'fourth', component: FourthComponent},
  { path: 'validator', component: ValidatorComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SecondComponent,
    ThirdComponent,
    FourthComponent,
    ValidatorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
