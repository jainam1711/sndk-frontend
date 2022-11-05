import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { PagesRoutingModule } from './pages-routing.module';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgDragDropModule.forRoot()
  ],
})
export class PagesModule { }
