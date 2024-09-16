import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// This effect listens for a Load action, makes an API request, and dispatches either a success or failure action.
loadEquities$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadEquitiesAction),
    switchMap(() =>
      this.equitiesService.getEquities().pipe(
        map((equities) => loadEquitiesSuccess({ equities })),
        catchError((error) => of(loadEquitiesFailure({ error })))
      )
    )
  )
);
