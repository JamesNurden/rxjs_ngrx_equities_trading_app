// state/asynch.operations.ts

import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { EquitiesService } from '../services/equities.service';
import { loadEquitiesAction, loadEquitiesSuccess, loadEquitiesFailure } from './trading.actions';
import { Action } from '@ngrx/store';

// This effect listens for Load Equities action, makes an API call, and dispatches success/failure.
@Injectable()
export class EquitiesEffects {

  constructor(
    private actions$: Actions,
    private equitiesService: EquitiesService
  ) {}

  loadEquities$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(loadEquitiesAction),
      switchMap(() =>
        this.equitiesService.getEquities().pipe(
          map((equities: any) => loadEquitiesSuccess({ equities })),
          catchError((error: any) => of(loadEquitiesFailure({ error })))
        )
      )
    )
  );
}
