import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesDisplayComponent } from '../components/notes-display/notes-display.component';
import { IonicModule } from '@ionic/angular';
import { TagsModalPage } from './tags-modal/tags-modal.page';
import { ResizeDirective } from '../directives/resize.directive';



@NgModule({
  declarations: [
    NotesDisplayComponent,
    TagsModalPage,
    ResizeDirective
  ],
  exports: [NotesDisplayComponent, TagsModalPage, ResizeDirective],
  entryComponents: [TagsModalPage],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
})
export class SharedModule { }
