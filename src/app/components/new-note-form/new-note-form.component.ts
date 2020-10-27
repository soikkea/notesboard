import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-note-form',
  templateUrl: './new-note-form.component.html',
  styleUrls: ['./new-note-form.component.css']
})
export class NewNoteFormComponent implements OnInit {

  @Output() noteAdded = new EventEmitter<string>();

  public newNoteContent = '';
  readonly textAreaMinRows = 1;
  readonly textAreaFullRows = 10;

  constructor() { }

  @ViewChild('newNoteTextarea') newNoteTextarea: CdkTextareaAutosize;

  ngOnInit(): void {
  }

  addNote(): void {
    if (!this.newNoteContent) {
      return;
    }
    this.noteAdded.emit(this.newNoteContent);
    this.newNoteContent = '';
    this.minimizeNewNoteTextArea();
  }

  newNoteTextAreaChanged(): void {
    if (!this.newNoteContent) {
      return;
    }
    this.resizeNewNoteTextArea(this.textAreaFullRows);
  }

  newNoteFocus(): void {
    // Pass
  }

  newNoteLoseFocus(): void {
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
    this.resizeNewNoteTextArea(this.textAreaMinRows);
  }

}
