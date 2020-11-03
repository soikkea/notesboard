import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteUpdate, NoteUpdateType } from 'src/app/models/note-update';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  @Input() note: Note;
  @Output() noteChanged = new EventEmitter<NoteUpdate>();

  public editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  setNoteImportance(value: boolean): void {
    this.note.important = value;
    this.sendNoteChangedEvent(NoteUpdateType.Update);
  }

  deleteNote(): void {
    this.sendNoteChangedEvent(NoteUpdateType.Delete);
  }

  editNote(): void {
    this.editMode = true;
  }

  acceptEdit(): void {
    this.editMode = false;
    this.sendNoteChangedEvent(NoteUpdateType.Update);
  }

  sendNoteChangedEvent(type: NoteUpdateType): void {
    const updateEvent: NoteUpdate = {
      type,
      note: this.note
    };
    this.noteChanged.emit(updateEvent);
  }

}
