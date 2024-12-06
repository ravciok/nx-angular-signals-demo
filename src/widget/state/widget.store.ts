import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Widget } from './widget.model';
import { WidgetApiService } from './widget.api.service';

type BooksState = {
  widgets: Widget[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  widgets: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const WidgetStore = signalStore(
  withState(initialState),
  withComputed(({ widgets, filter }) => ({
    widgetsCount: computed(() => widgets().length),
    sortedWidgets: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return widgets().toSorted((a, b) =>
        direction * a.name.localeCompare(b.name)
      );
    }),
  })),
  withMethods((store, widgetApiService = inject(WidgetApiService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return widgetApiService.getByQuery(query).pipe(
            tapResponse({
              next: (widgets) => patchState(store, { widgets }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);