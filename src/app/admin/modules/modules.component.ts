import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent  implements OnInit{
modulesdata:any;
modules:any;
id:any;

constructor(private api:ApiService){}

  ngOnInit(): void {

    this.load();
  }

  load(){
    this.modulesdata= new FormGroup({
      department: new FormControl('', Validators.compose ([Validators.required])),
      description: new FormControl('',Validators.compose ([Validators.required])),
      selectimage: new FormControl(),
      landingpage: new FormControl('',Validators.compose ([Validators.required])),
      srno: new FormControl('',Validators.compose([Validators.required])),
    })
    this.api.get("Modules").subscribe((data:any)=>{
      this.modules=data;
      console.log(data);

    })
  }

  save(data: any) {
    console.log(data);
    if (this.id == null) {
      this.api.post("modules", data).subscribe((result: any) => {
        alert("Modules Details Added.")
        this.load();
      })
    }
    else {
      if (confirm("Are You Sure To Update Information")) {
        this.api.put("modules/" + this.id, data).subscribe((result: any) => {
          this.load();
        })
      }
    }
  }




  edit(id:number){
    this.api.get("Modules/" + id).subscribe((data: any) => {
      this.modulesdata.patchValue({
        department: data.department,
        description: data.description,
        selectimage: data.selectimage,
        landingpage: data.landingpage,
        srno: data.srno,

      })
    })
  }

  delete(id:number){
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
        this.api.delete("Modules/" + id).subscribe((result: any) => {
          this.api.showMessage({title:"Success", type:"success", message:this.api.delete_success_msg});
          this.load();
        })
      }
    })
  }
}
