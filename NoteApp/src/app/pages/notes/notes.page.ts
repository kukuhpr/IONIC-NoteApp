import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { UserNotes } from 'src/app/services/notes.interface';
import { runInThisContext } from 'vm';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit, OnDestroy {
  display = true;
  userId: string;
  notes = [];
  tagName = 'All notes';
  isEmpty = true;

  private destroySusbcription = false;


  constructor(
    private router: Router,
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute
  ) {
    const list = window.localStorage.getItem('list');
    this.display = list === 'true' ? true : false;



  }

  ngOnInit() {
    //this.userId = window.localStorage.getItem('user_note_id');
    //this.getUserNotes(this.userId);
    this.activatedRoute.queryParamMap
      .pipe(takeWhile(() => !this.destroySusbcription))
      .subscribe((data: Params) => {
        this.userId = window.localStorage.getItem('user_note_id');
        if (!this.userId) {
          setTimeout(() => {
            this.isEmpty = false;
          }, 2000);
          return;
        }
        this.tagName = data.params.title;
        this.userNotes(this.tagName);
        if (this.tagName === 'All Notes' || !this.tagName) {
          this.tagName = 'All Notes';
          this.getUserNotes(this.userId);
        }
      });
  }
  ngOnDestroy() {
    this.destroySusbcription = true;
  }

  getUserNotes(id) {
    this.notesService.getNotes()
      .pipe(takeWhile(() => !this.destroySusbcription))
      .subscribe(data => {
        if (!data) {
          return;
        }
        setTimeout(() => {
          const userNotes = data.filter(note => note.id === id);
          if (userNotes.length === 0) {
            return;
          }
          this.notes = userNotes[0].notes;
          this.isEmpty = false;
        }, 2000);
      });
  }

  userNotes(tagName) {
    this.notesService.userNotes(this.userId)
      .pipe(takeWhile(() => !this.destroySusbcription))
      .subscribe((data: UserNotes) => {
        if (!data || !data.notes) {
          return;
        }
        this.isEmpty = true;
        setTimeout(() => {
          this.notes = data.notes.filter(note => note.tagName === tagName);
          if (this.tagName === 'My Favorites') {
            this.notes = data.notes.filter(note => note.favorite === true);
          }
          this.isEmpty = false;
        }, 2000);
      });
  }

  addNote() {
    this.router.navigate(['/add-note', this.tagName])
  }

  changeDisplay() {
    this.display = !this.display;
    if (this.display) {
      window.localStorage.setItem('list', 'true');
    } else {
      window.localStorage.setItem('list', 'false');
    }
  }

}
