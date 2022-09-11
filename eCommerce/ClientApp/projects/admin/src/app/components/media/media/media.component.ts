import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../../shared/service/table.service';
import { MediaDB, MEDIADB } from '../../../shared/tables/media';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class MediaComponent implements OnInit {

  public tableItem$: Observable<MediaDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(MEDIADB)
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

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit() {
  }

}
