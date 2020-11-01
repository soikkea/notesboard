import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Note } from '../models/note';

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
        tap(_ => this.log('fetched notes')),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error) => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
      catchError(this.handleError<Note>('addNote'))
    );
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateNote'))
    );
  }

  deleteNote(note: Note | number): Observable<Note> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, this.httpOptions).pipe(
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  private log(message: string): void {
    console.log(`NoteService: ${message}`);
  }
}
