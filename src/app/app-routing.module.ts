import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'notes', component: NotesComponent , canActivate:[AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
