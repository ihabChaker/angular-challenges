import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MySliderHarness } from './slider.harness';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    await fixture.whenStable();
  });

  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      const sliderHarness = await loader.getHarness(
        MySliderHarness.with({
          minValue: 10,
        }),
      );
      await sliderHarness.clickPlus();
      await sliderHarness.clickPlus();

      expect(await sliderHarness.getValue()).toBe(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      const sliderHarness = await loader.getHarness(
        MySliderHarness.with({
          minValue: 10,
        }),
      );

      await sliderHarness.clickPlus();
      await sliderHarness.clickMinus();
      await sliderHarness.clickMinus();

      expect(await sliderHarness.getValue()).toBe(10);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      const firstSliderHarness = await loader.getHarness(
        MySliderHarness.with({ minValue: 10 }),
      );
      const secondSliderHarness = await loader.getHarness(
        MySliderHarness.with({ minValue: 0 }),
      );

      await firstSliderHarness.clickPlus();
      await firstSliderHarness.clickPlus();
      await firstSliderHarness.clickPlus();
      await firstSliderHarness.clickPlus();

      expect(await secondSliderHarness.disabled()).toBeFalsy();
    });
  });
});
