import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TradeListComponent } from './components/trade-list/trade-list.component';
import { TradeDetailsComponent } from './components/trade-details/trade-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { tradingReducer } from './state/trading.reducer';
import { TradingEffects } from './state/trading.effects';
import { TradingService } from './services/trading.service';
import { appRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TradeListComponent,
    TradeDetailsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ trading: tradingReducer }),
    EffectsModule.forRoot([TradingEffects]),
    appRoutingModule
  ],
  providers: [TradingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
