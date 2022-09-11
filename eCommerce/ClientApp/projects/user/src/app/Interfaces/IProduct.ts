import { Observable } from "rxjs";

export interface IProduct {
    title: string;
    completed: boolean;
}

export interface Pending<T> {
    data: Observable<T>;
    status: Observable<Status>;
}

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}