import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Note } from '../models/note';
import { NOTES } from '../mocks/mock-notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  getNotes(): Observable<Note[]> {
    return of(NOTES);
  }

  addNote(note: Note): Observable<Note> {
    return of(note);
  }
}
