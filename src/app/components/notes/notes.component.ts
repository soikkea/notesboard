import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note'
import { NOTES } from '../../mocks/mock-notes'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = NOTES;

  constructor() { }

  ngOnInit(): void {
  }

}
