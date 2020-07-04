import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';

import { TagsModalPage } from '../tags-modal/tags-modal.page';
import { Notes, UserNotes } from 'src/app/services/notes.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit, OnDestroy {
  tagColor = 'warning';
  tagName = 'Untagged';
  favorite = false;
  description: string;
  currentDate = new Date();

  isFocused = false;
  note: Notes;
  userId: string;
  noteId: number;
  notes = [];

  private destroySusbcription = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private notesService: NotesService,
    private activitedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.userId = this.activitedRoute.snapshot.params.id;
    this.noteId = this.activitedRoute.snapshot.params.noteId;
    this.notesService.userNotes(this.userId)
      .pipe(takeWhile(() => !this.destroySusbcription))
      .subscribe((data: UserNotes) => {
        this.notes = data.notes;
        const result = data.notes.find(note => note.noteId === Number(this.noteId));
        if (result) {
          this.note = result;
          this.description = result.description;
          this.favorite = result.favorite;
          this.tagColor = result.tagColor;
        }
      });
  }
  ngOnDestroy() {
    this.destroySusbcription = true;
  }

  async showTagsModal() {
    const modal = await this.modalCtrl.create({
      component: TagsModalPage
    });
    modal.onDidDismiss()
      .then((value) => {
        if (value.data) {
          this.tagColor = value.data.color;
          this.tagName = value.data.tag
        }
      })

    return await modal.present();
  }

  favoriteNote() {
    this.favorite = !this.favorite;
    this.isFocused = true;
  }

  inputFocused() {
    this.isFocused = true;
  }

  inputBlur() {
    this.isFocused = false;
  }

  editNote() {
    const note = {
      noteId: Number(this.noteId),
      description: this.description,
      tagName: this.tagName,
      tagColor: this.tagColor,
      date: new Date().toISOString(),
      favorite: this.favorite
    };

    const result = this.notes.filter(notes => notes.noteId !== Number(this.noteId));
    result.push(note);
    this.notesService.updateUserNote(this.userId, result);
    this.router.navigate(['/notes']);
  }

  deleteNote() {
    const result = this.notes.filter(notes => notes.noteId !== Number(this.noteId));
    this.notesService.deleteUserNote(this.userId, result);
    this.router.navigate(['/notes']);
  }

  goBack() {
    this.location.back();
  }

}
