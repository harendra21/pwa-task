import { Component, OnInit,Input } from '@angular/core';
import { print } from 'util';

@Component({
  selector: 'app-dobage',
  templateUrl: './dobage.component.html',
  styleUrls: ['./dobage.component.css']
})
export class DobageComponent implements OnInit {
  @Input() dob : string;
  public age = null;
  constructor() { }

  ngOnInit() {

    var age = this.getAge(this.dob)
    this.age = age;

  }

  getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
  }

}
