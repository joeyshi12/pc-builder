import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <dialog [open]="isOpen">
      <div [style.max-width.rem]="widthRem">
        <header>
          <h1>{{title}}</h1>
        </header>
        <div>
          <ng-content />
        </div>
      </div>
    </dialog>
  `,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() public isOpen: boolean = false;
  @Input({required: true}) public title!: string;
  @Input() public widthRem: number = 30;
}
