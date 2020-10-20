import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TextFieldModule} from '@angular/cdk/text-field';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSlideToggleModule,
    TextFieldModule,
    DragDropModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
