import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './Message';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  insert_success_msg = "Data Inserted Successfully.";
  delete_success_msg = "Data Deleted Successfully.";
  update_success_msg = "Data Updated Successfully.";

  baseurl="https://localhost:7042/api/";
  constructor(private http:HttpClient) {}



    get(url:String){
      return this.http.get( this.baseurl + url);
    }
    post(url:string,data:any){
      return this.http.post( this.baseurl + url, data);
    }

    put(url:string,data:any){
      return this.http.put( this.baseurl + url, data);
    }
    delete(url:String){
      return this.http.delete( this.baseurl + url);
    }

    public loadJsFile(url: string) {
      let node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
    }

    public showMessage(message:Message){
      if(message.type == "success"){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000
        })
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }

}



export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
