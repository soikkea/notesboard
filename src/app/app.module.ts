import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NewNoteFormComponent } from './components/new-note-form/new-note-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteDetailComponent,
    NewNoteFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    // TODO: Remove for production use
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    ),

    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
