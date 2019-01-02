import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


/**
 * This file is organizational only. It contains all the modules that are imported from Angular Material.
 */


const modules = [
	MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule, MatListModule, MatExpansionModule,
    MatIconModule, MatToolbarModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }
