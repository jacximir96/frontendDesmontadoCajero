import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CajaChicaService } from '../../core/services/caja-chica.service';
import { CajaChicaComponenteLogica } from 'src/app/core/utils/CajaChicaComponenteLogica';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caja-chica',
  templateUrl: './caja-chica.component.html',
  styleUrls: ['./caja-chica.component.scss']
})
export class CajaChicaComponent implements OnInit {

  constructor (
    private cajaChicaService: CajaChicaService,
    private router: Router,
  ){}

  dataLogic?: CajaChicaComponenteLogica;

  ngOnInit(): void {
    this.dataLogic = new CajaChicaComponenteLogica(this.cajaChicaService);
    localStorage.setItem('notificacion', JSON.stringify(this.dataLogic.toast));
  }

  getValorFecha(date: Date) {
    this.dataLogic!.formatearFecha(date);
    this.dataLogic!.displayCalendar = !this.dataLogic!.displayCalendar;
  }

  pressInputFecha() {
    this.dataLogic!.displayCalendar = !this.dataLogic!.displayCalendar;
  }

  async consultarValor(){
    if(this.dataLogic!.currentDate == ''){
      Swal.fire({
          customClass: {
            confirmButton: "text-white w-32 bg-blue-700 hover:bg-blue-800",
          },
          title: 'Atención!',
          text: 'Por favor debe de seleccionar una fecha',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
    }else{
      try {
        this.dataLogic!.getValorCajaChica();
      } catch (error) {
        console.log(error)
      }
    }
  }

  cancelar(){
    let routePath = '/retiro';
    localStorage.removeItem('notificacion');
    this.router.navigate([routePath]);
  }
}
