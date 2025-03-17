import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() content!: string

  @Output() logHeader: EventEmitter<string> = new EventEmitter();

  @Output() isVisible: EventEmitter<boolean> = new EventEmitter();

  visibleCondition: boolean = true


  sendtLog() {
    this.logHeader.emit(this.content);
    this.visibleCondition = !this.visibleCondition;
    this.isVisible.emit(this.visibleCondition);
  }

}
