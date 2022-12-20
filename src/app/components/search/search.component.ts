import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MeetupService} from "../../services/meetup/meetup.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit{
  form!: FormGroup

  constructor(private _router: Router, private _meetupService: MeetupService,
              private _userService: UserService) {
  }

  ngOnInit() {
    this._createForm()
    this.form.controls['searchValue'].valueChanges.subscribe((value) => {
      console.log(this.form.value['selectedUserRole'].toLowerCase())
      this.search(value)

    })
  }

  search(value: string) {
    if (this._router.url === '/users') {
      let selectedUserRoleValue = this.form.value['selectedUserRole'].toLowerCase()
      // selectedUserRoleValue = selectedUserRoleValue === 'не выбран' ? '' : selectedUserRoleValue
      this._userService.searchUser(value.toLowerCase(), selectedUserRoleValue)
    }
  }
  get searchedValue() {
    return this.form.value['searchValue']
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
      searchValue: new FormControl(''),
      selectedUserRole: new FormControl('')
    })
  }
}
