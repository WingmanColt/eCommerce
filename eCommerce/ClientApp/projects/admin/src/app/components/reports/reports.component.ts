import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import * as chartData from '../../shared/data/chart';
import { ReportDB, REPORTDB } from '../../shared/tables/report';
import { Observable } from 'rxjs';
import { TableService } from '../../shared/service/table.service';
import { NgbdSortableHeader, SortEvent } from '../../shared/directives/NgbdSortableHeader';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ReportsComponent implements OnInit {

  // lineChart
  public salesChartData = chartData.salesChartData;
  public salesChartLabels = chartData.salesChartLabels;
  public salesChartOptions = chartData.salesChartOptions;
  public salesChartColors = chartData.salesChartColors;
  public salesChartLegend = chartData.salesChartLegend;
  public salesChartType = chartData.salesChartType;

  public areaChart1 = chartData.areaChart1;
  public columnChart1 = chartData.columnChart1;
  public lineChart = chartData.lineChart;

  public chart5 = chartData.chart6

  public tableItem$: Observable<ReportDB[]>;
  public searchText;
  total$: Observable<number>;

  constructor(public service: TableService) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(REPORTDB)
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
