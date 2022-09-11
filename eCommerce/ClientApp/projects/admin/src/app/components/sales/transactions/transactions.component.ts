import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../../shared/service/table.service';
import { TransactionsDB, TRANSACTIONDB } from '../../../shared/tables/transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [TableService, DecimalPipe],
})

export class TransactionsComponent implements OnInit {

  public tableItem$: Observable<TransactionsDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(TRANSACTIONDB)
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
