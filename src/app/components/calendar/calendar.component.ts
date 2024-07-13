import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  
  currentMonth: Date = new Date();
  daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  monthOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  fullMesActual: string = '';
  monthDays: Date[] = [];
  monthDaysEmpty: string[] = [];
  weeks:Array<Array<Date>> = [];
  haveEmptyDays:boolean = false;
  firstWeek: Date[] = [];
  dateSelected: Date = new Date();

  @Output()
  public onValueFecha: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  public displayCalendar: boolean = true;
  

  emitValorFecha() {
    this.onValueFecha.emit(this.dateSelected);
  }

  generateMonthDays() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    this.fullMesActual = this.monthOfYear[this.currentMonth.getMonth()];

    this.monthDays = [];
    this.monthDaysEmpty = [];
    this.firstWeek = [];
    this.haveEmptyDays = false;
    this.weeks = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.monthDays.push(new Date(year, month, i));
    }
    //Llena el array de dias vacios
    console.log(firstDay.getDay());
    if(firstDay.getDay() !== 1 ){
      this.haveEmptyDays = true;
      let limit = (firstDay.getDay() == 0) ? 6 : firstDay.getDay() - 1;
      for (let i = 0; i < limit; i++) {
        this.monthDaysEmpty.push('');
      }
      //Para completar primera semana
      this.monthDays.slice(0, 7-limit).forEach(days => {
        this.firstWeek.push(days);
        
      })

      for (let i = 7-limit; i < this.monthDays.length; i += 7) {
        const week = this.monthDays.slice(i, i + 7);
        this.weeks.push(week);
      }

    }else{
      for (let i = 0; i < this.monthDays.length; i += 7) {
        const week = this.monthDays.slice(i, i + 7);
        this.weeks.push(week);
      }
    }
  }

  ngOnInit(): void {
    this.generateMonthDays();
  }

  prevMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateMonthDays();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateMonthDays();
  }

  selectDate(day: Date) {
    this.dateSelected = day;
    this.emitValorFecha();
  }

  divideIntoWeeks() {
    for (let i = 0; i < this.monthDays.length; i += 7) {
      const week = this.monthDays.slice(i, i + 7);
      this.weeks.push(week);
    }
  }
}
