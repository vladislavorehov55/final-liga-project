import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MeetupService} from "../../services/meetup/meetup.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit{
  form!: FormGroup

  constructor(private _meetupService: MeetupService) {
  }

  ngOnInit() {
    this._createForm()
    this.form.controls['searchValue'].valueChanges.subscribe((value) => {
      this._meetupService.searchMeetups(value.toLowerCase())
    })
  }

  get changeDetection() {
    console.log('Render search')
    return ''
  }

  private _createForm() {
    this.form = new FormGroup({
      searchValue: new FormControl('')
    })
  }
}
