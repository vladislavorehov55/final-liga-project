import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-svg-generator',
  templateUrl: './svg-generator.component.html',
  styleUrls: ['./svg-generator.component.scss']
})
export class SvgGeneratorComponent implements OnInit{
  ngOnInit() {  }

  constructor(private _router: Router) {
  }

  @Input()
  type!: string
  @Output() userIconClickEvent = new EventEmitter()

}
