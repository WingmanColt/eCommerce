import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../../shared/service/table.service';
import { LISTCOUPLEDB, ListCouponsDB } from '../../../shared/tables/list-coupon';
@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListCouponComponent implements OnInit {

  public selected = [];

  public tableItem$: Observable<ListCouponsDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(LISTCOUPLEDB)
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
