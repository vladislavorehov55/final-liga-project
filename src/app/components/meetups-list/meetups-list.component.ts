import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, Input} from '@angular/core';
import {MeetupService} from "../../services/meetup/meetup.service";
import {IMeetup} from "../../models/meetup";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsListComponent implements OnInit, OnDestroy {
  constructor() {}

  @Input()
  currentMeetups:IMeetup[] = []

  ngOnInit() {
    console.log('Init meetups')

  }
  ngOnDestroy() {
    console.log('Destroy meetups')

  }


}
