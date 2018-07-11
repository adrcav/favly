import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  url = 'http://localhost:3000/repos';

  constructor(private http: Http) { }

  getRepos(): Observable<Response> {
    return this.http.get(this.url);
  }

  likeRepo(repo) {
    return this.http.put(`${this.url}/${repo.id}`, repo);
  }


}
