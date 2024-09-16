// Define actions (e.g., for fetching real-time stock prices)
export const fetchStockPrices = createAction('[Stocks] Fetch Prices');
export const fetchStockPricesSuccess = createAction(
  '[Stocks] Fetch Prices Success',
  props<{ prices: StockPrice[] }>()
);

// Reducer to manage stock prices in the store
export const stockPricesReducer = createReducer(
  initialState,
  on(fetchStockPricesSuccess, (state, { prices }) => ({
    ...state,
    prices,
    loaded: true
  }))
);

// Effect to fetch real-time stock prices from an API
@Injectable()
export class StockPricesEffects {
  loadStockPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStockPrices),
      mergeMap(() =>
        this.stockService.getRealTimeStockPrices().pipe(
          map(prices => fetchStockPricesSuccess({ prices })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private stockService: StockService) {}
}

// Component to display real-time stock prices using NgRx and RxJS
@Component({
  selector: 'app-stock-list',
  template: `
    <div *ngFor="let stock of stocks$ | async">
      {{ stock.symbol }}: {{ stock.price }}
    </div>
  `
})
export class StockListComponent implements OnInit {
  stocks$ = this.store.select(selectAllStocks);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(fetchStockPrices());
  }
}
