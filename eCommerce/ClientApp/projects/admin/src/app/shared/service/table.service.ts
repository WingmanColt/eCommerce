/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';

interface SearchResult {
    tableItem: any[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tableItem: any[], column: SortColumn, direction: string): any[] {
    if (direction === '' || column === '') {
        return tableItem;
    } else {
        return [...tableItem].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

@Injectable({ providedIn: 'root' })
export class TableService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _tableItem$ = new BehaviorSubject<any[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    userData;

    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._tableItem$.next(result.tableItem);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    get tableItem$() { return this._tableItem$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) {
        this._set({ page });
    }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    setUserData(val: object) {
        console.log("val", val);

        this.userData = val;
    }

    

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page } = this._state;

        // 1. sort
        let tableItem = sort(this.userData, sortColumn, sortDirection);
        console.log("tableItem", tableItem);

        // 2. filter
        const total = tableItem.length;

        tableItem = tableItem
            .map((item, i) => ({ id: i + 1, ...item }))
            .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        console.log("total ", tableItem);
        return of({ tableItem, total });
    }

}

