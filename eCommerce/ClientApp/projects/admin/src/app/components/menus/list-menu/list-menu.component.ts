import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../../shared/service/table.service';
import { ListPagesDB } from '../../../shared/tables/list-pages';
import { MENUDB, MenuDB } from '../../../shared/tables/menu';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListMenuComponent implements OnInit {

  public selected = [];

  public tableItem$: Observable<ListPagesDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(MENUDB)
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

  ngOnInit() { }

}
