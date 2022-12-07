import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss']
})
export class MyInputComponent implements OnInit{
  ngOnInit() {
  }
  @Input()
  inputValue!: string
  @Input()
  placeholder!: string
  @Output()
  inputValueChangeEvent = new EventEmitter<string>()
}
