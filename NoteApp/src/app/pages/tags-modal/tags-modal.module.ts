import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsModalPageRoutingModule } from './tags-modal-routing.module';

import { TagsModalPage } from './tags-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsModalPageRoutingModule
  ],
  declarations: [TagsModalPage]
})
export class TagsModalPageModule {}
