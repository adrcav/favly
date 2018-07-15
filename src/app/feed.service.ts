import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  url = 'https://favly.herokuapp.com';

  constructor(private http: Http) { }

  getUserId() {
    return this.http.post(`${this.url}/user`, {});
  }

  getIdRepos(userId): Observable<Response> {
    return this.http.get(`${this.url}/user/${userId}`);
  }

  getFavoriteRepo(id): Observable<Response> {
    return this.http.get(`https://api.github.com/repositories/${id}`);
  }

  likeRepo(userId, repo) {
    return this.http.post(`${this.url}/user/${userId}/addrepository`, repo);
  }

  unlikeRepo(userId, repoId) {
    return this.http.delete(`${this.url}/user/${userId}/delrepository`, new RequestOptions({
      body: {
        repositoryId: repoId
      }
    }));
  }


}
