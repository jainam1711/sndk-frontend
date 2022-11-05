import { DropEvent } from 'ng-drag-drop';
import { Component, OnInit, Injector } from '@angular/core';

// Helpers
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  task: string;
  pending = [];
  completed = [];

  constructor(
    inject: Injector
  ) {
    super(inject);
  }

  ngOnInit(): void {
    const pending = this.getCookie('PENDING');
    if (pending) { this.pending = JSON.parse(pending); }
    const completed = this.getCookie('COMPLETED');
    if (completed) { this.completed = JSON.parse(completed); }
  }

  addTask(): void {
    this.pending.push({ name: this.task, type: 'pending' });
    this.task = undefined;
  }

  pendingDrop(e: DropEvent): void {
    this.pending.push({ name: e.dragData.name, type: 'pending' });
    this.removeItem(e.dragData, this.completed);
    this.updateData();
  }

  completedDrop(e: DropEvent): void {
    this.completed.push({ name: e.dragData.name, type: 'completed' });
    this.removeItem(e.dragData, this.pending);
    this.updateData();
  }

  onDeleteDrop(e: DropEvent): void {
    const list = e.dragData.type === 'pending' ? this.pending : this.completed;
    this.removeItem(e.dragData, list);
    this.updateData();
  }

  removeItem(item: any, list: Array<any>): void {
    const index = list.map((e) => {
      return e.name;
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  updateData(): void {
    this.setCookie('PENDING', JSON.stringify(this.pending));
    this.setCookie('COMPLETED', JSON.stringify(this.completed));
  }

}
