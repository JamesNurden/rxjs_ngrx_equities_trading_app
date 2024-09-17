import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // For making HTTP requests
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // Optional: for debugging
import { environment } from '../environments/environment'; // Import environment config

import { AppComponent } from './app.component';
import { tradingReducer } from './state/trading.reducer'; // Import specific reducer
import { TradingEffects } from './state/trading.effects'; // Import specific effect

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add this to make HTTP requests from TradingService
    StoreModule.forRoot({ trading: tradingReducer }), // Register the trading feature reducer
    EffectsModule.forRoot([TradingEffects]), // Register the trading effects
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [], // Optional DevTools
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
