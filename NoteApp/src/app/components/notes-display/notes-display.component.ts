import { Component, Input } from '@angular/core';
import { Notes } from 'src/app/services/notes.interface';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.scss'],
})
export class NotesDisplayComponent {
  @Input() listDisplay: boolean;
  @Input() notes: Notes[];

  userId: string;

  constructor(
    private router: Router
  ) { }


  editPage(note: Notes) {
    this.userId = window.localStorage.getItem('user_note_id')
    this.router.navigate([`/edit-note/${this.userId}/${note.noteId}`]);
  }

}
