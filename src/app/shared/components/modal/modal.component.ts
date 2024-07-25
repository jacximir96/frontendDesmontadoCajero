import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title!:string;
  @Input() description!:string;
  @Output() cerrar = new EventEmitter<void>();

  close() {
    this.cerrar.emit();
  }
}
