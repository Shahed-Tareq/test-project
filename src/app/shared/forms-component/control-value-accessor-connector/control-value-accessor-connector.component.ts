import { Component, Injector, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-control-value-accessor-connector',
  standalone: true,
  imports: [],
  template: ''
})
export class ControlValueAccessorConnectorComponent implements ControlValueAccessor{

  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @Input()
  public formControl: FormControl;

  @Input()
  public formControlName: string;

  public get control(): FormControl {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName) as FormControl
    );
  
  }

  constructor(protected readonly injector: Injector) {}

  public get controlContainer(): ControlContainer {
    return this.injector.get(ControlContainer);
  }

  public registerOnTouched(fn: () => void): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
  }

  public registerOnChange(fn: () => void): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }
  }

  public writeValue(obj: number | string): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.writeValue(obj);
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.formControlDirective) {
      this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
  }
}
