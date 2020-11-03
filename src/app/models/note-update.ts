import { Note } from './note';

export enum NoteUpdateType {
    Update,
    Delete
}

export interface NoteUpdate {
    type: NoteUpdateType;
    note: Note;
}
