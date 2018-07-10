import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  @Input() repo;
  @Output() likedRepoChild = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  likedRepo(repo) {
    this.likedRepoChild.emit(repo);
  }

}
