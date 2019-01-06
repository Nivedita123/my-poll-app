import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public globals: Globals
  ) { }

  ngOnInit() {
  }

}
