import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';


const modules = [
	MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule, MatListModule, MatExpansionModule,
    MatIconModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }
