/// <reference lib="webworker" />

import { HeavyCalculationService } from './heavy-calculation.service';

export class StartEvent extends Event {}
let heavyCalculationService = new HeavyCalculationService();

addEventListener(
  'message',
  () => {
    heavyCalculationService.startLoading((percentage) => {
      postMessage({
        percentage,
      });
    });
  },
  { once: true },
);
