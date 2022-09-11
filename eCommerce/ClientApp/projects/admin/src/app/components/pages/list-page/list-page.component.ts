import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../../shared/service/table.service';
import { LISTPAGEDB, ListPagesDB } from '../../../shared/tables/list-pages';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListPageComponent implements OnInit {
  public selected = [];
  public tableItem$: Observable<ListPagesDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(LISTPAGEDB)
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  ngOnInit() {
  }

}
