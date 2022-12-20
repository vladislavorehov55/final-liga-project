import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MeetupService} from "../../services/meetup/meetup.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy{
  private _valueChangesSubscription = new Subscription()
  form!: FormGroup
  @Input()
  label: string = ''
  constructor(private _router: Router, private _meetupService: MeetupService,
              private _userService: UserService) {
  }

  ngOnInit() {
    this._createForm()
    this._valueChangesSubscription = this.form.controls['searchedValue'].valueChanges.subscribe((value) => {
      console.log(this.form.value['selectedValue'].toLowerCase())
      this.search(value)
    })
  }


  search(value: string) {

    let selectedValue = this.form.value['selectedValue'].toLowerCase()

    if (this.url === '/users') {
      // selectedUserRoleValue = selectedUserRoleValue === 'не выбран' ? '' : selectedUserRoleValue
      this._userService.searchUser(value.toLowerCase(), selectedValue)
    }
    else {
      this._meetupService.searchMeetups(value.toLowerCase(), selectedValue.toLowerCase())
    }
  }
  get searchedValue() {
    return this.form.value['searchedValue']
  }
  get url() {
    return this._router.url
  }

  @Input()
  options: string[] = []

  @Output()
  changeSearchValueEvent = new EventEmitter()

  get changeDetection() {
    console.log('Render search')
    return ''
  }

  private _createForm() {
    this.form = new FormGroup({
      searchedValue: new FormControl(''),
      selectedValue: new FormControl('')
    })
  }

  ngOnDestroy() {
    this._valueChangesSubscription.unsubscribe()
  }


}
