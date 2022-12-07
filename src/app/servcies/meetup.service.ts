import { Injectable } from '@angular/core';
import {IMeetup} from "../models/meetup";

@Injectable()
export class MeetupService {
  meetups: Array<IMeetup> = [
    {
      id: 1,
      name: "RxJS",
      description: "Расскажем об основах RxJS",
      location: "Переговорка 4",
      target_audience: "Разработчики, аналитики",
      need_to_know: "Ядренную физику",
      will_happen: "Будем готовить пиццу",
      reason_to_come: "Надо",
      time: "2022-10-07T18:44:14.712Z",
      createdBy: 'Александр Козаченко'
    }
  ]
  constructor() { }
}
