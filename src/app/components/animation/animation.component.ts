import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.css',
  animations: [
    trigger('fadeInOut', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show <=> hide', [animate('500ms ease-in-out')]),
    ]),
    trigger('bounce', [
      transition('void => *', [
        animate('3s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-30px)', offset: 0.3 }),
          style({ transform: 'translateX(0)', offset: 0.6 }),
          style({ transform: 'translateX(-30px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ]),
  ]
})
export class AnimationComponent {

  isVisible = true;

  toggle() {
    this.isVisible = !this.isVisible;
  }

}
