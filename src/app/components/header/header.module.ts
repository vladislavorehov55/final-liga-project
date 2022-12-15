import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {RouterModule} from "@angular/router";
import {SvgGeneratorModule} from "../shared/svg-generator/svg-generator.module";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SvgGeneratorModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
