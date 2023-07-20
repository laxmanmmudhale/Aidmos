import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(){

  }

  toggleNavbar(event:Event){
    //collapsed
    let ctrl = document.getElementsByClassName("js-sidebar")[0];
    ctrl.classList.toggle("collapsed");
  }

}
