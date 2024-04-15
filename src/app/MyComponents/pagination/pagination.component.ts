import { Component, EventEmitter,OnInit, Input, Output,SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number=1;
  @Input() total: number =0;
  @Input() limit: number=10;
  @Output() changePage = new EventEmitter<number>();
  @Output() decreasePage = new EventEmitter<number>();
  @Output() increasePage = new EventEmitter<number>();
  pages:number[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    console.log("hello");
    if ((changes['total'] && changes['total'].currentValue !== changes['total'].previousValue )|| (changes['currentPage'] && changes['currentPage'].currentValue !== changes['currentPage'].previousValue) || (changes['limit'] && changes['limit'].currentValue !== changes['limit'].previousValue)) {
      
      console.log("hello");
      if(this.total){
        this.updatePages();
      }
      
    }
    
   
  }

  private updatePages(): void {
    console.log(this.total , this.limit)
    const pagesCount = Math.ceil(this.total / this.limit);
    const visiblePages = 6;
    const maxPages = Math.min(visiblePages, pagesCount);
    const startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(pagesCount, startPage + maxPages - 1);
    this.pages = this.range(startPage, endPage);
  }

  changePageNumber(page: number): void {
    this.changePage.emit(page);
  }

  range(start: number, end: number): number[] {
    return [...Array(end - start + 1).keys()].map(el => el + start);
  }
}
