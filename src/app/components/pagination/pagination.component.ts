import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  private _currentPage: number = 1
  get currentPage() {
    return this._currentPage
  }

  ngOnInit() {
  }

  @Output()
  changePageEvent = new EventEmitter

  changePageHandler(newPageNumber: number) {
    console.log('newPageNumberr')
    this.changePageEvent.emit(newPageNumber)
    this._currentPage = newPageNumber
  }

}
