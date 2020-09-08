import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from '../models/note';
import { NOTES } from '../mocks/mock-notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesUrl = 'api/notes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
      catchError(this.handleError<Note>('addNote'))
    );
  }
}
