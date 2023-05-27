import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { TrashComponent } from './components/trash/trash.component';
import { SearchComponent } from './components/search/search.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LabelComponent } from './components/label/label.component';
import { ArchiveComponent } from './components/archive/archive.component';
const routes: Routes = [
  {path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'notes', component: NotesComponent , canActivate:[AuthGuard]},
    { path: 'reminders', component: RemindersComponent, canActivate:[AuthGuard]},
    { path: 'notes', component: NotesComponent , canActivate:[AuthGuard]},
    { path: 'archive', component: ArchiveComponent, canActivate:[AuthGuard]},
    {path: 'trash', component: TrashComponent, canActivate:[AuthGuard]},
    { path: 'label/:labelName', component: LabelComponent, canActivate:[AuthGuard]},
    { path: 'search', component: SearchComponent, canActivate:[AuthGuard]}
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
