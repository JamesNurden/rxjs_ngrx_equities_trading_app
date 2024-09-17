// trade-details.component.ts
import { Component, Input } from '@angular/core';
import { Trade } from '../state/trading.state';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.css']
})
export class TradeDetailsComponent {
  @Input() trade: Trade;
}
