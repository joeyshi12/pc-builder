import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <dialog [open]="isOpen">
      <div #dialogContent [style.max-width.rem]="widthRem">
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

  @Output() public close: EventEmitter<void> = new EventEmitter();

  @ViewChild("dialogContent") private _dialogContentRef?: ElementRef;

  @HostListener("document:keydown.escape")
  public onEscapeDown(): void {
    if (this.isOpen) {
      this.close.emit();
    }
  }

  @HostListener("document:mousedown", ["$event.target"])
  public onMouseDown(target: EventTarget): void {
    if (!this._dialogContentRef?.nativeElement.contains(target) && this.isOpen) {
      this.close.emit();
    }
  }
}
