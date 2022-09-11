import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Category, CATEGORY } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableService } from '../../../../shared/service/table.service';
import { SortEvent } from '../../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../../shared/directives/NgbdSortableHeader";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [TableService, DecimalPipe],
})


export class CategoryComponent implements OnInit {
  public closeResult: string;

  searchText;
  tableItem$: Observable<Category[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: TableService, private modalService: NgbModal) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(CATEGORY)
  }

  onSort({ column, direction }) {
    // resetting other headers
    console.log("dsafsa");

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
