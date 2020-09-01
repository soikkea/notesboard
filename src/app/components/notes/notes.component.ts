import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  add(contents: string): void {
    if (!contents) { return; }

    const newNote: Note = {
      content: contents,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: this.notes.length + 1
    };
    console.log('Adding a new Note!');
    this.noteService.addNote(newNote)
      .subscribe(note => {this.notes.push(note)})
    };
}
