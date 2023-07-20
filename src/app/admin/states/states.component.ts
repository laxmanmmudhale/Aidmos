import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  id: any;
  statesdata: any;
  states: any;

  constructor(private api: ApiService) { }
  ngOnInit(): void {


    this.load();
  }

  load() {
    this.id = null;
    this.statesdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      states: new FormControl(""),
      
    })

    this.api.get("States").subscribe((result: any) => {
      this.states = result;
    })
  }

  Save(data: any) {
    console.log(data);
    if (this.id == null) {
      this.api.post("States", data).subscribe((result: any) => {
        alert("States Details Added.")
        this.load();
      })
    }
    else {
      if (confirm("Are You Sure To Update Information")) {
        this.api.put("States/" + this.id, data).subscribe((result: any) => {
          this.load();
        })
      }
    }
  }

  edit(id: number) {
    this.id = id;

    this.api.get("States/" + id).subscribe((result: any) => {
      this.statesdata.patchValue({
        id: result.id,
        name: result.name,
        states: result.states,
       
      })
    })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("States/" + id).subscribe((result: any) => {
          this.api.showMessage({title:"Success", type:"success", message:this.api.delete_success_msg});
          this.load();
        })
      }
    })

  }
}
