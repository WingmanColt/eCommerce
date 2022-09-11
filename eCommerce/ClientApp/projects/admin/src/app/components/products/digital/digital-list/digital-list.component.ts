import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortEvent } from '../../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../../shared/directives/NgbdSortableHeader";
import { TableService } from '../../../../shared/service/table.service';
import { DigitalCategoryDB } from '../../../../shared/tables/digital-category';
import { DIGITALLIST, DigitalListDB } from '../../../../shared/tables/digital-list';
@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss'],
  providers: [TableService, DecimalPipe],
})
export class DigitalListComponent implements OnInit {
  tableItem$: Observable<DigitalListDB[]>;
  public digital_categories = []

  constructor(public service: TableService, private modalService: NgbModal) {
    this.tableItem$ = service.tableItem$;
    this.service.setUserData(DIGITALLIST)
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    console.log("ddsds");

    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

  }

  ngOnInit() { }

}
