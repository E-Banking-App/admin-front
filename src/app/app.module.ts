import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule } from './material/material.module'

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { AgentComponent } from './agent/agent.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogComponent } from './dialog/dialog.component';
import {HttpClientModule} from '@angular/common/http'

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'agencies', component: AgenciesComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'client', component: ClientComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgenciesComponent,
    AgentComponent,
    ClientComponent,
    AdminComponent,
    NotfoundComponent,
    SigninComponent,
    NavbarComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
