import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  id:any;
  businessid:any;
  userdata:any;
  users:any;

  constructor(private route:ActivatedRoute, private api:ApiService){
    this.businessid = this.route.snapshot.paramMap.get('businessid');
  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.userdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      usertype: new FormControl(""),
      mobileno: new FormControl(""),
      email: new FormControl(""),
      username: new FormControl(""),
      password: new FormControl(""),
      businessid: new FormControl(3),
    })
    this.api.get("users/userbyid/"+this.businessid).subscribe((result:any)=>{
      this.users = result;
      console.log(result);

    })
  }

  save(data:any){
    if (this.id == null) {
      this.api.post("users", data).subscribe((result: any) => {
        alert("Business Details Added.")
        this.load();
      })
    }
    else {
      if (confirm("Are You Sure To Update Information")) {
        this.api.put("users/" + this.id, data).subscribe((result: any) => {
          this.load();
        })
      }
    }
  }

  edit(id:number){
    this.id = id;

    this.api.get("users/" + id).subscribe((result: any) => {
      this.userdata.patchValue({
        id: result.id,
        name: result.name,
        usertype: result.usertype,
        mobileno: result.mobileno,
        email: result.email,
        username: result.username,
        password: result.password,
        businessid: result.businessid,
      })
    })
  }

  delete(id:number){

  }
}
