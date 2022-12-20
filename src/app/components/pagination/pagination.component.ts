import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  // private _currentPage: number = 1
  // get currentPage() {
  //   return this._currentPage
  // }

  ngOnInit() {
  }
  @Input()
  currentPageNumber: number = 1
  @Input()
  itemsCount: number = 0
  @Input()
  itemsOnPage: number = 1
  @Output()
  changePageEvent = new EventEmitter

  changePageHandler(newPageNumber: number) {
    const pagesCount = Math.ceil(this.itemsCount / this.itemsOnPage)
    if (newPageNumber === 0 || newPageNumber > pagesCount ) {
      console.log('can not paginate')
      return
    }
    this.changePageEvent.emit(newPageNumber)
    // this._currentPage = newPageNumber
  }

}
