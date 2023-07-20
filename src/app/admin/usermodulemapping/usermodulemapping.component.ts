import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usermodulemapping',
  templateUrl: './usermodulemapping.component.html',
  styleUrls: ['./usermodulemapping.component.css']
})
export class UsermodulemappingComponent implements OnInit {

  userdata:any;


  ngOnInit(): void {
    this.userdata = new FormGroup({
      selectoptions : new FormControl(),

    })


  }

  save(data:any){
console.log(data);

  }



}
