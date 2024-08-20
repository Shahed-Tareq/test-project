import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private errorMessages: {[key:string]:string} = {
    required: "Field is required",
    pattern: "Invalid formate"
  }

  public getErrorMessages (control:AbstractControl) : string | null {
   if(!control.errors) {
    return null;
   }
   for (const errorKey in control.errors) {
    if (control.errors.hasOwnProperty(errorKey)) {
      return this.errorMessages[errorKey] || 'Invalid field';
    }
  }

  return null;
}

  }
 

