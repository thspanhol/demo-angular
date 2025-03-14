import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() content!: string

  @Output() logHeader: EventEmitter<string> = new EventEmitter();

  sendtLog() {
    this.logHeader.emit(this.content);
  }

}
