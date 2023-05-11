import {AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {BehaviorSubject, combineLatest, map, mapTo, Subject, takeUntil, tap} from "rxjs";


@Directive({
  selector: '[frontendLbNxMatTableResponsiveDirective]'
})
export class MatTableResponsiveDirective implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();

  private thead?: HTMLTableSectionElement;
  private tbody?: HTMLTableSectionElement;

  private theadChanged$ = new BehaviorSubject(true);
  private tbodyChanged$ = new Subject<boolean>();

  private theadObserver = new MutationObserver(() =>
      this.theadChanged$.next(true)
  );
  private tbodyObserver = new MutationObserver(() =>
      this.tbodyChanged$.next(true)
  );

  constructor(private table: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.thead = this.table.nativeElement.querySelector('thead');
    this.tbody = this.table.nativeElement.querySelector('tbody');

    this.theadObserver.observe(this.thead!, {
      characterData: true,
      subtree: true
    });
    this.tbodyObserver.observe(this.tbody!, { childList: true });
  }

  ngAfterViewInit() {
      this.thead = this.table.nativeElement.querySelector('thead');
      this.tbody = this.table.nativeElement.querySelector('tbody');
      this.theadObserver.observe(this.thead!, {
          characterData: true,
          subtree: true
      });
      this.tbodyObserver.observe(this.tbody!, { childList: true });



      /**
     * Set the "data-column-name" attribute for every body row cell, either on
     * thead row changes (e.g. language changes) or tbody rows changes (add, delete).
     */
    combineLatest([this.theadChanged$, this.tbodyChanged$])
        .pipe(
            mapTo({ headRow: this.thead!.rows.item(0)!, bodyRows: this.tbody!.rows }),
            map(({ headRow, bodyRows }) => ({
                // @ts-ignore
              columnNames: [...headRow.children].map(
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  headerCell => headerCell.textContent!
              ),
                // @ts-ignore
              rows: [...bodyRows].map(row => [...row.children])
            })),
            takeUntil(this.onDestroy$)
        )
        .subscribe(({ columnNames, rows }) => {
            return    rows.forEach(rowCells =>
                    rowCells.forEach(cell =>
                        this.renderer.setAttribute(
                            cell,
                            'data-column-name',
                            columnNames[(cell as HTMLTableCellElement).cellIndex]
                        )
                    )
                )
            }
        );
  }

  ngOnDestroy(): void {
    this.theadObserver.disconnect();
    this.tbodyObserver.disconnect();

    this.onDestroy$.next(true);
  }
}
