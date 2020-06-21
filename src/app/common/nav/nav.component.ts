import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  collapsed = true;
  @Output() logoutClick = new EventEmitter();
  constructor() { }
  ngOnInit() {
    
  }
  logoutClicked() {
    this.logoutClick.emit();
  }

}
