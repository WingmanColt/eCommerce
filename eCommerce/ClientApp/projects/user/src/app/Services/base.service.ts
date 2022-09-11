import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseService {
  constructor(/*private helper: Helpers*/) { }
  baseApiUrl: string = environment.baseApiUrl;
}