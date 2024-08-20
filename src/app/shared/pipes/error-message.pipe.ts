import { inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMessageService } from '../services/error-message.service';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false
})
export class ErrorMessagePipe implements PipeTransform {

  private errorMessageServices:ErrorMessageService = inject(ErrorMessageService)
  transform(control:AbstractControl): string | null {
    return this.errorMessageServices.getErrorMessages(control);
  }

}
