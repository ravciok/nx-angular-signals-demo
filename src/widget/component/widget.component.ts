import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetStore } from '../state/widget.store';

@Component({
  selector: 'app-widget',
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  providers: [WidgetStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent implements OnInit {
  readonly store = inject(WidgetStore);


  ngOnInit(): void {
    const query = this.store.filter.query;
    // 👇 Re-fetch books whenever the value of query signal changes.
    this.store.loadByQuery(query);
  }
}
