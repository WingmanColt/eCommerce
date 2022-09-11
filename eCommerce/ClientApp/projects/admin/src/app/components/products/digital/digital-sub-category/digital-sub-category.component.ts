import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DIGITALSUBCATEGORY, DigitalSubCategoryDB } from '../../../../shared/tables/digital-sub-category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortEvent } from '../../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../../shared/directives/NgbdSortableHeader";
import { DecimalPipe } from '@angular/common';
import { TableService } from '../../../../shared/service/table.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-digital-sub-category',
  templateUrl: './digital-sub-category.component.html',
  styleUrls: ['./digital-sub-category.component.scss'],
  providers: [TableService, DecimalPipe],
})

export class DigitalSubCategoryComponent implements OnInit {
  public closeResult: string;
  tableItem$: Observable<DigitalSubCategoryDB[]>;
  public digital_categories = []

  constructor(public service: TableService, private modalService: NgbModal) {
    this.tableItem$ = service.tableItem$;
    this.service.setUserData(DIGITALSUBCATEGORY)
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
