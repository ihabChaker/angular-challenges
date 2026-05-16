import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';

import { HarnessLoader } from '@angular/cdk/testing';

import { ChildComponent } from './child.component';
describe('ChildComponent', () => {
  let fixture: ComponentFixture<ChildComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    await fixture.whenStable();
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      expect(await loader.getAllHarnesses(MatInputHarness)).toHaveLength(4);
      expect(await loader.getAllHarnesses(MatButtonHarness)).toHaveLength(2);
      expect(await loader.getAllHarnesses(MatSliderHarness)).toHaveLength(1);
      expect(await loader.getAllHarnesses(MatCheckboxHarness)).toHaveLength(3);
    });

    test('Then initial value of slider thumb is 0', async () => {
      let thumb = await loader.getHarness(MatSliderThumbHarness);
      expect(await thumb.getValue()).toEqual(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    beforeEach(async () => {
      let maxValueInput = await loader.getHarness(
        MatInputHarness.with({
          selector: '#input-max',
        }),
      );

      await maxValueInput.setValue('109');
    });
    test('Then slider max value is 109', async () => {
      let slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.getMaxValue()).toEqual(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    beforeEach(async () => {
      let checkboxHarness = await loader.getHarness(
        MatCheckboxHarness.with({
          label: 'Disabled',
        }),
      );

      await checkboxHarness.check();
    });

    test('Then slider is disabled', async () => {
      let slider = await loader.getHarness(MatSliderHarness);

      expect(await slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    beforeEach(async () => {
      let stepValueInput = await loader.getHarness(
        MatInputHarness.with({
          selector: '#input-step',
        }),
      );
      await stepValueInput.setValue('5');

      let forwardBtnHarness = await loader.getHarness(
        MatButtonHarness.with({
          variant: 'mini-fab',
          text: 'arrow_forward_ios',
        }),
      );

      await forwardBtnHarness.click();
      await forwardBtnHarness.click();
    });

    test('Then thumb value is 10', async () => {
      let thumb = await loader.getHarness(MatSliderThumbHarness);

      expect(await thumb.getValue()).toEqual(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    beforeEach(async () => {
      let sliderValueInput = await loader.getHarness(
        MatInputHarness.with({
          selector: '#input-value',
        }),
      );
      await sliderValueInput.setValue('5');

      let stepValueInput = await loader.getHarness(
        MatInputHarness.with({
          selector: '#input-step',
        }),
      );
      await stepValueInput.setValue('6');

      let backwardBtnHarness = await loader.getHarness(
        MatButtonHarness.with({
          variant: 'mini-fab',
          text: 'arrow_back_ios',
        }),
      );

      await backwardBtnHarness.click();
    });

    test('Then slider value is still 5', async () => {
      let thumb = await loader.getHarness(MatSliderThumbHarness);

      expect(await thumb.getValue()).toEqual(5);
    });
  });
});
