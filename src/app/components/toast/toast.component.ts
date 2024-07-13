import { Component, Input, OnInit } from '@angular/core';
import { Toast, TypeToast } from 'src/app/interfaces/toast.interface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})

export class ToastComponent implements OnInit{
  
  toast: Toast = {
    mensaje: '',
    type: 'success',
    mostrar: false,
    fixed: false
  };

  duration: number = 3000; // Duración predeterminada de 3 segundos

  ngOnInit(): void {
    if(localStorage.getItem('notificacion')){
      let notificacion = JSON.parse(localStorage.getItem('notificacion')!)
      this.toast.mensaje = notificacion.mensaje;
      this.toast.type = notificacion.type;
      this.toast.mostrar = notificacion.mostrar;
      this.toast.fixed = (notificacion.fixed) ? notificacion.fixed : false;
      if(!this.toast.fixed){
          setTimeout(() => {
          this.toast.mostrar = false;
          localStorage.removeItem('notificacion')
        }, 3000);
      }
      
    }
    
  }

}
