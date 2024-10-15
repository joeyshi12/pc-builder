import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <dialog [open]="isOpen">
      <div>
        <header>
          <h1>{{title}}</h1>
        </header>
        <div class="dialog-body">
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
}
