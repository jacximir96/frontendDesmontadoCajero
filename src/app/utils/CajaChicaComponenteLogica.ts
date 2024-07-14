import { environment } from "src/environments/environment.local";
import { Toast } from "../interfaces/toast.interface";
import { CajaChicaService } from "../services/caja-chica.service";
import { ObtenerCajaChicaResponse } from "../interfaces/caja-chica/obtener-valor.interface";

export class CajaChicaComponenteLogica {
    
    title: string;
    currentDate: String;
    displayCalendar: boolean;
    valorCajaChica: string;
    toast!: Toast;
    dataCajaChica!: ObtenerCajaChicaResponse;

    constructor(
        private cajaChicaServicio: CajaChicaService
    ) 
    {
        this.title = 'Caja chica local';
        this.currentDate = '';
        this.displayCalendar = false;
        this.valorCajaChica = '';
        this.inicializaToast();
    }

    formatearFecha(currentDate: Date){
        const anio = currentDate.getFullYear();
        const mes = String(currentDate.getMonth() + 1).padStart(2, '0'); // Mes 0-11
        const dia = String(currentDate.getDate()).padStart(2, '0'); // Día
        this.currentDate = `${anio}-${mes}-${dia}`;
    }

    public async getValorCajaChica(){
        let cajaChicaResponse = await this.cajaChicaServicio.obtenerValorCajaChica(environment.ip_estacion);
        this.dataCajaChica = cajaChicaResponse;
        if(!this.dataCajaChica.error){
          this.valorCajaChica = `$ ${this.dataCajaChica.resolucion[0].total_caja.toFixed(2)}`;
        }else{
          this.toast.mensaje  = 'Error! A ocurrido un error en el proceso por favor, vuelva a intentarlo.',
          this.toast.type     = 'danger',
          this.toast.mostrar  = true,
          this.toast.fixed    = true;
        }
    }

    private inicializaToast(){
        this.toast = {
            mensaje: 'Informacion! El campo hasta, es la fecha en la que representan todos los gastos con caja chica',
            type: 'success',
            mostrar: true,
            fixed: true
        }
    }
}