import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../shared/service/table.service';
import { InvoiceDB, INVOICEDB } from '../../shared/tables/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class InvoiceComponent implements OnInit {

  public tableItem$: Observable<InvoiceDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(INVOICEDB)
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


  ngOnInit() {
  }

}
