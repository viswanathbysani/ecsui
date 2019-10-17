import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule, MatCard} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,MatToolbarModule,MatCardModule,MatChipsModule,MatSelectModule,MatSnackBarModule
  ]

})
export class MaterialModule { }
