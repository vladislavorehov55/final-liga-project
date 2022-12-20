import {ChangeDetectionStrategy,Component, Input, OnInit} from '@angular/core';
import {IUserGetResponse} from "../../models/user";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit{
  @Input()
  users!: IUserGetResponse[]
  ngOnInit() {
  }
}
