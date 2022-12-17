import { Component } from '@angular/core';
import {FormService} from "../../services/form/form.service";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  constructor(private _formService: FormService) {
  }

  get form() {
    return this._formService.form
  }
  get title() {
    return this._formService.title
  }
  get isSown() {
    return this._formService.isShow
  }
  get formType() {
    return this._formService.formType
  }
  closeFormHandler() {
    this._formService.isShow = false
  }
}
