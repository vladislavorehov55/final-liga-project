import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgGeneratorComponent } from './svg-generator.component';



@NgModule({
  declarations: [
    SvgGeneratorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SvgGeneratorComponent]
})
export class SvgGeneratorModule { }
