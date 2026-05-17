import {
  BaseHarnessFilters,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
} from '@angular/cdk/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';

interface MySliderHarnessFilters extends BaseHarnessFilters {
  /** Filters based on the trigger text for the menu. */
  minValue?: number;
}

export class MySliderHarness extends ComponentHarness {
  static hostSelector = 'app-slider';

  protected getPlusIconHarness = this.locatorFor(
    MatIconHarness.with({
      name: 'arrow_forward_ios',
    }),
  );

  protected getMinusIconHarness = this.locatorFor(
    MatIconHarness.with({
      name: 'arrow_back_ios',
    }),
  );
  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: MySliderHarnessFilters = {},
  ): HarnessPredicate<T> {
    return new HarnessPredicate(this, options).addOption(
      'Min value',
      options.minValue,
      (harness, minVal) =>
        new Promise<boolean>(async (resolve, reject) => {
          let val = await harness.getMinValue();
          resolve(val === minVal);
        }),
    );
  }

  protected getSliderHarness = this.locatorFor(MatSliderHarness);

  protected getSliderThumbHarness = this.locatorFor(MatSliderThumbHarness);

  async clickPlus(): Promise<void> {
    let plusIconHarness = await this.getPlusIconHarness();

    return (await plusIconHarness.host()).click();
  }

  async clickMinus(): Promise<void> {
    let minusIconHarness = await this.getMinusIconHarness();

    return (await minusIconHarness.host()).click();
  }

  async getValue(): Promise<number> {
    let thumb = await this.getSliderThumbHarness();

    return thumb.getValue();
  }

  async getMinValue(): Promise<number> {
    let slider = await this.getSliderHarness();

    return slider.getMinValue();
  }

  async disabled(): Promise<boolean> {
    let thumb = await this.getSliderThumbHarness();

    return thumb.isDisabled();
  }

  async setValue(value: number): Promise<void> {
    let thumb = await this.getSliderThumbHarness();

    return thumb.setValue(value);
  }
}
