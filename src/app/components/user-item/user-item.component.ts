import {Component, Input, OnInit} from '@angular/core';
import {IUser, IUserResponse} from "../../models/user";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit{
  @Input()
  user!: IUserResponse
  ngOnInit() {
  }
}
