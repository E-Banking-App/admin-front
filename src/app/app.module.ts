import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule } from './material/material.module'

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AgenciesComponent } from './pages/agencies/agencies.component';
import { AgentComponent } from './pages/agent/agent.component';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {HttpClientModule} from '@angular/common/http'
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'agencies', component: AgenciesComponent, canActivate: [AuthGuardGuard] },
  { path: 'agent', component: AgentComponent, canActivate: [AuthGuardGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard] },
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
