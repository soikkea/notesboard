import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  newNoteContent = '';

  constructor(private noteService: NoteService) { }

  @ViewChild('newNoteTextarea') newNoteTextarea: CdkTextareaAutosize;

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => {
        this.updateNotes(notes);
      });
  }

  addNote(): void {
    if (!this.newNoteContent) {
      return;
    }
    this.add(this.newNoteContent);
    this.newNoteContent = '';
    this.minimizeNewNoteTextArea();
  }

  add(contents: string): void {
    if (!contents) { return; }

    const newNote: Note = {
      content: contents,
      date: new Date().toISOString(),
      important: false,
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

  drop(event: CdkDragDrop<Note[]>) {
    moveItemInArray(this.notesToShow, event.previousIndex, event.currentIndex);
  }

  newNoteFocus(): void {
    console.log("FOCUS!");
    this.resizeNewNoteTextArea(10);
  }

  newNoteLoseFocus(): void {
    console.log("LOSE FOCUS!");
    if (this.newNoteContent) {
      return;
    }
    this.minimizeNewNoteTextArea();
  }

  resizeNewNoteTextArea(rows: number): void {
    this.newNoteTextarea.minRows = rows;
    this.newNoteTextarea.maxRows = rows;
    this.newNoteTextarea.resizeToFitContent(true);
  }

  minimizeNewNoteTextArea(): void {
    this.resizeNewNoteTextArea(1);
  }
}
