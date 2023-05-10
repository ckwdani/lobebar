import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableResponsiveDirective } from './mat-table-responsive-directive.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [MatTableResponsiveDirective],
  exports: [MatTableResponsiveDirective],
})
export class SharedDirectivesModule {}
