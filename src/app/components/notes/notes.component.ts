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
  showAll = true;
  notesToShow: Note[];
  searchString = '';

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => {
        this.updateNotes(notes);
      });
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
      .subscribe(note => {
        const newNotes = this.notes.concat(note);
        this.updateNotes(newNotes);
      })
  };

  update(updatedNote: Note): void {
    this.noteService.updateNote(updatedNote)
      .subscribe(_ => {
        const newNotes = this.notes.map(note => note.id !== updatedNote.id ? note : updatedNote);
        this.updateNotes(newNotes);
      })
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id)
      .subscribe(_ => {
        const notes = this.notes.filter(note => note.id !== id);
        this.updateNotes(notes);
      })
  }

  setShowAll(value: boolean): void {
    this.showAll = value;
    this.filterNotes();
  }

  updateNotes(notes: Note[]): void {
    this.notes = notes;
    this.filterNotes();
  }

  setSearchString(value: string): void {
    this.searchString = value;
    this.filterNotes();
  }

  filterNotes(): void {
    const importantFilter = this.showAll ?
      (_: Note) => true :
      (note: Note) => note.important;
    const searchFilter = this.searchString ?
      (note: Note) => note.content.toLowerCase().includes(this.searchString) :
      (_: Note) => true;
    
      this.notesToShow = this.notes.filter(note => importantFilter(note) && searchFilter(note));
  }
}
