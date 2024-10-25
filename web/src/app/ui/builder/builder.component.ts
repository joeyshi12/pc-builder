import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridEvent, ColDef, GridOptions, SelectionChangedEvent } from "ag-grid-community";
import { map, Observable } from 'rxjs';
import * as PcBuildActions from '../../data/pc-build/pc-build.actions';
import { PcBuild } from 'src/app/transfers/pc_build';
import { AppState } from 'src/app/data/app.state';
import { userBuildsSelector } from 'src/app/data/app.selectors';
import { isLoggedInSelector } from 'src/app/data/user/user.selectors';
import { draftComponentsSelector, draftSelector } from 'src/app/data/pc-build/pc-build.selectors';
import { ComponentListModel, toComponentListModels } from '../pc-components.util';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  public readonly draftBuild$: Observable<PcBuild>;
  public readonly userBuilds$: Observable<PcBuild[]>;
  public readonly isLoggedIn$: Observable<boolean>;
  public readonly componentListModels$: Observable<ComponentListModel[]>;

  public isOverflowMenuOpen: boolean = false;
  public readonly columnDefs: ColDef[] = [
    { field: "displayName", checkboxSelection: true },
    { field: "description" }
  ];
  public readonly gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true
    }
  };
  public isBuildListOpen: boolean = false;
  public isEditDraftOpen: boolean = false;
  private _selectedBuild?: PcBuild;

  @ViewChild("menuButton")
  private _menuButtonRef?: ElementRef;

  @ViewChild("overflowMenu")
  private _overflowMenuRef?: ElementRef;

  @HostListener("document:keydown.escape")
  public onEscapeDown(): void {
    this.isBuildListOpen = false;
    this.isEditDraftOpen = false;
    this.isOverflowMenuOpen = false;
  }

  @HostListener("document:mousedown", ["$event.target"])
  public onMouseDown(target: EventTarget): void {
    if (!this._menuButtonRef?.nativeElement.contains(target)
        && !this._overflowMenuRef?.nativeElement.contains(target)) {
      this.isOverflowMenuOpen = false;
    }
  }

  constructor(private readonly _store: Store<AppState>) {
    this._store.dispatch(PcBuildActions.loadPcBuilds());
    this.userBuilds$ = _store.select(userBuildsSelector);
    this.draftBuild$ = _store.select(draftSelector);
    this.isLoggedIn$ = _store.select(isLoggedInSelector);
    this.componentListModels$ = _store.select(draftComponentsSelector).pipe(
      map(toComponentListModels)
    );
  }

  public get hasSelectedBuild(): boolean {
    return Boolean(this._selectedBuild);
  }

  public toggleOverflowMenu(): void {
    this.isOverflowMenuOpen = !this.isOverflowMenuOpen;
  }

  public resizeGrid(event: AgGridEvent) {
    event.api.sizeColumnsToFit();
  }

  public createNewDraft(): void {
    this._store.dispatch(PcBuildActions.setNewPcBuild());
    this.isOverflowMenuOpen = false;
  }

  public deleteDraft(): void {
    this._store.dispatch(PcBuildActions.deleteDraftBuild());
    this.isOverflowMenuOpen = false;
  }

  public openBuildList(): void {
    this._selectedBuild = undefined;
    this.isBuildListOpen = true;
  }

  public updateBuildSelection(event: SelectionChangedEvent<PcBuild>) {
    this._selectedBuild = event.api.getSelectedRows()[0];
  }

  public switchBuild(): void {
    if (this._selectedBuild) {
      this._store.dispatch(PcBuildActions.updateDraftSuccess({ draftBuild: this._selectedBuild }));
      this.isBuildListOpen = false;
      this._selectedBuild = undefined;
    }
  }

  public updateDraftInfo(displayName: string, description: string) {
    this._store.dispatch(PcBuildActions.updateBasicInfo({displayName, description}))
    this.isEditDraftOpen = false;
  }
}
