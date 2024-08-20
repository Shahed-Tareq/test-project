import { Component, Input, input } from '@angular/core';
import { ControlValueAccessorConnectorComponent } from '../control-value-accessor-connector/control-value-accessor-connector.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessagePipe } from '../../pipes/error-message.pipe';

@Component({
  selector: 'contactLess-input',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , ErrorMessagePipe],
  templateUrl: './input.component.html',
providers: [
  {provide: NG_VALUE_ACCESSOR , useExisting: InputComponent , multi: true}
]
})
export class InputComponent extends ControlValueAccessorConnectorComponent {

  /**
   * @description Inputs 
   */
  @Input() public label:string;
  @Input() public placeholder:string;
  @Input() public isSubmitted:string;
  @Input () public type:string = "text"

}
