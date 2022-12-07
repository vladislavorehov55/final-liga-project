import {Component, Input, OnInit} from '@angular/core';
import {IMeetup} from "../../models/meetup";

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrls: ['./meetup-item.component.scss']
})
export class MeetupItemComponent implements OnInit{
  ngOnInit() {
  }
  @Input()
  meetup!: IMeetup
}
