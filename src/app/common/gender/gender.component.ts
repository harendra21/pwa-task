import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {
  @Input() gender: string;
  public showGender = null;
  constructor() { }

  ngOnInit() {
    if(this.gender == '1'){
      this.showGender = "Male";
    }else{
      this.showGender = "Female";
    }
  }

}
