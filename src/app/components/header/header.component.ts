import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() content!: string

  @Output() logHeader: EventEmitter<string> = new EventEmitter();

  @Output() isVisible: EventEmitter<boolean> = new EventEmitter();

  bananavar$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  visibleCondition: boolean = true;

  private subscription!: Subscription;

  sendtLog() {
    this.logHeader.emit(this.content);

    this.visibleCondition = !this.visibleCondition;
    this.isVisible.emit(this.visibleCondition);
  }

  ngOnInit(): void {    
    this.subscription = this.meuObservable.subscribe(this.meuObserver);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('Cancela assinatura dos headers');
  }

    meuObservable = new Observable(observer => {
      observer.next('log um');
      observer.next('log dois');
      observer.complete();
    });
  
    meuObserver = {
      next: (valor: any) => console.log('Recebido:', valor),
      error: (erro: any) => console.error('Erro:', erro),
      complete: () => console.log('Finalizado')
    };

    bananaVarBollean = () => this.bananavar$.next(true);
}
