import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DIGITALCATEGORY, DigitalCategoryDB } from '../../../../shared/tables/digital-category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortEvent } from '../../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../../shared/directives/NgbdSortableHeader";
import { TableService } from '../../../../shared/service/table.service';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss'],
  providers: [TableService, DecimalPipe],
})
export class DigitalCategoryComponent implements OnInit {
  public closeResult: string;
  tableItem$: Observable<DigitalCategoryDB[]>;
  public digital_categories = []

  constructor(public service: TableService, private modalService: NgbModal) {
    this.tableItem$ = service.tableItem$;
    this.service.setUserData(DIGITALCATEGORY)
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
