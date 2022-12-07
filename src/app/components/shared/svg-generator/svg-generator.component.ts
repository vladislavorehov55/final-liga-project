import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-generator',
  templateUrl: './svg-generator.component.html',
  styleUrls: ['./svg-generator.component.scss']
})
export class SvgGeneratorComponent implements OnInit{
  ngOnInit() {  }

  @Input()
  type!: string
}
