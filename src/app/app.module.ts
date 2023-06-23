import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateLabelDialogComponent } from './components/create-label-dialog/create-label-dialog.component';
import { ChangeImageDialogComponent } from './components/change-image-dialog/change-image-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DataServiceService } from './services/data-service.service';
import { AppService } from './services/app.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './components/search/search.component';
import { TrashComponent } from './components/trash/trash.component';
import { LabelComponent } from './components/label/label.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { SearchFilterPipe } from './services/search-filter.pipe';
import { DialogOverviewExampleDialog } from './components/dialog/dialog.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    RegistrationComponent,
    AppComponent,
    NotesComponent,
    NoteCardComponent,
    HomeComponent,
    CreateLabelDialogComponent,
    ChangeImageDialogComponent,
    LoginComponent,
    SearchComponent,
    TrashComponent,
    LabelComponent,
    RemindersComponent,
    ArchiveComponent,
    SearchFilterPipe,
    DialogOverviewExampleDialog
  
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule, JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [AppService,DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
