import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/forms-component/input/input.component';

@Component({
  selector: 'contactLess-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit, AfterViewInit, OnDestroy {
  public contactForm: FormGroup;
  public undoStack: any[] = [];
  public redoStack: any[] = [];
  @ViewChild('formElement') formElement!: ElementRef;

  public ngOnInit(): void {
    this.contactFormInitialization();
  }

  private contactFormInitialization() {
    this.contactForm = new FormGroup({
      messageTitle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      isConfirm: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
    });
    this.pushToUndoStack();
  }

  public ngAfterViewInit() {
    this.formElement.nativeElement.addEventListener(
      'focusout',
      this.onFormFocusOut.bind(this)
    );
  }

  public ngOnDestroy() {
    if (this.formElement) {
      this.formElement.nativeElement.removeEventListener(
        'focusout',
        this.onFormFocusOut.bind(this)
      );
    }
  }

  /**
   * @description we call this function to push in undo stack , for the first time we called it when initialize the form to take the initial value
   */
  pushToUndoStack() {
    const currentState = this.contactForm.getRawValue();

    const lastState = this.undoStack[this.undoStack.length - 1];

    if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
      this.undoStack.push(JSON.parse(JSON.stringify(currentState)));
    }
  }

  /**
   * @description we call this function when click on undo button
   */

  undo() {
    if (this.undoStack.length > 1) {
      // when click undo should add it to redoStack
      this.redoStack.push(this.undoStack.pop());
      this.contactForm.setValue(this.undoStack[this.undoStack.length - 1], {
        emitEvent: false,
      });
    }
  }

  /**
   * @description we call this function when click on redo button then we will push the object which we redone it to undo stack
   */
  redo() {
    if (this.redoStack.length > 0) {
      const redoState = this.redoStack.pop();
      this.contactForm.setValue(redoState, { emitEvent: false });
      this.pushToUndoStack(); // Save the redo state to the undo stack
    }
  }

  /**
   * @description we called this function when form Focus out
   */
  onFormFocusOut() {
    this.pushToUndoStack();
  }
}
