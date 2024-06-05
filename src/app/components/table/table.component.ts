import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor(private router:Router){}
  toggle(id:any) {
    let tr 
        
    tr = document.getElementById('datafas');

           console.log(tr?.classList.length);
           if(tr?.classList.length === 2)
          {          setTimeout(() => {
            tr = document.getElementById('datafas');
            tr?.classList.toggle('expand');
          }, 550);
        }
           if(tr?.classList.length === 1)
           tr?.classList.toggle('expand');
          


           setTimeout(() => {
            const accordion = document.getElementById(id);
          accordion?.classList.toggle('expanded');
          }, 10);
  }
  
  redirect(){
   this.router.navigate(['/efectivo']);
  }
}