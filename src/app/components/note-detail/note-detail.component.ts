import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  @Input() note: Note;
  @Output() noteChanged = new EventEmitter<Note>();
  @Output() noteDeleted = new EventEmitter<number>();

  public editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  setNoteImportance(value: boolean): void {
    this.note.important = value;
    this.noteChanged.emit(this.note);
  }

  deleteNote(): void {
    this.noteDeleted.emit(this.note.id);
  }

  editNote(): void {
    this.editMode = true;
  }

  acceptEdit(): void {
    this.editMode = false;
    this.noteChanged.emit(this.note);
  }

}
