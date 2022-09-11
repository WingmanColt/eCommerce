import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { CATEGORY, Category } from '../../../../shared/tables/category';
import { TableService } from '../../../../shared/service/table.service';
import { SortEvent } from '../../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../../shared/directives/NgbdSortableHeader";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [TableService, DecimalPipe],
})


export class SubCategoryComponent {
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
}
