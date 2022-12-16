import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SvgGeneratorModule} from "../shared/svg-generator/svg-generator.module";



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SvgGeneratorModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
