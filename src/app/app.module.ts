import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteCardComponent,
    HomeComponent,
    CreateLabelDialogComponent,
    ChangeImageDialogComponent,
    LoginComponent
  ],
  imports: [
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
