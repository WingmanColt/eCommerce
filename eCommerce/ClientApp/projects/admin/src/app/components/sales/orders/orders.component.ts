import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortEvent } from '../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../shared/directives/NgbdSortableHeader";
import { TableService } from '../../../shared/service/table.service';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { OrderDB, ORDERDB } from '../../../shared/tables/order-list';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [TableService, DecimalPipe],
})

export class OrdersComponent implements OnInit {
  public closeResult: string;
  public tableItem$: Observable<OrderDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService, private modalService: NgbModal) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(ORDERDB)
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

}
