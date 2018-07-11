import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [SearchService]
})
export class MenuComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {

  }

}
