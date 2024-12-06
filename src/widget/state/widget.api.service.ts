import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Widget } from './widget.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetApiService {
  public getByQuery(query: any): Observable<Widget[]> {
    return of([
      {
        id: 23,
        name: 'Widget 23',
      },
      {
        id: 3,
        name: 'Widget 3',
      },
      {
        id: 41,
        name: 'Widget 41',
      },
      {
        id: 12,
        name: 'Widget 12',
      },
      {
        id: 4,
        name: 'Widget 4',
      },
    ]).pipe(delay(1000));
  }
}
