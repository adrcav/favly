import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = 'https://api.github.com/search/repositories';

  constructor(private http: Http) { }

  searchRepo() {
    let days = moment().subtract(1, 'd').format('YYYY-MM-DD');
    return this.http.get(`${this.url}?q=created:>${days}&sort=stars&order=desc`);
  }

}
