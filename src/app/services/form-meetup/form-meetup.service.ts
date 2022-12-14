import {Injectable} from '@angular/core';
import {IFormFields} from "../../components/form-meetup/form-meetup.component";

@Injectable()
export class FormMeetupService {
  title: string = 'Создание митапа'
  formFieldsValue: IFormFields = {
    name: '',
    date: '',
    time: '',
    place: '',
    description: '',
    audience: '',
    knowledge: '',
    happen: ''
  }
  isCreating: boolean = true
  isShow: boolean = true

  setFormMeetupContent(title: string, formFieldsValue: IFormFields) {
    this.title = title
    this.formFieldsValue = formFieldsValue
  }
  closeForm() {
    this.isShow = false
  }
  constructor() {
  }
}
