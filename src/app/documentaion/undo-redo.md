# Undo and Redo Form State

we build a form called contact us , the user can send message with his/her name and email and confirm also select the gender and we have two buttons one for undo another for redo.

## angular version and libraries:

1. angular version 17
2. tailwind.css

## Implementation :

1. use reactive form for build the form
2. add required validation for some of them.
3. create shared folder for shared components
4. create input as shared component
5. create service to handle message error and show it for the user
6. create also pipe to return the appropriate message
7. create component to show form which called is **ContactFormComponent**
8. the main logic and code for redo and undo we implement in this component , we will below explain it in details.

## What is implemented to handle undo and redo:

1. declare and initialize some variables contact form for our form , undoStack is to store the undo states and redoStack to store redo states (when undo change push it to redo , when click on redo change push this one to redo)

` public contactForm: FormGroup;
    public undoStack: any[] = [];
    public redoStack: any[] = [];
    @ViewChild('formElement') formElement!: ElementRef;`

---

2. call this function in the onInit function , to initialize the contact form and push the initial value for our UndoStack
   `private contactFormInitialization() {
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
}`

   ***

3. we have added focusout event on the form to when make sure that it's initialized

`  public ngAfterViewInit() {
      this.formElement.nativeElement.addEventListener(
        'focusout',
        this.onFormFocusOut.bind(this)
      );
    }`

---

4. this function wil call to add current state of form on the undo stack to

   _here will get the current state for the form_
   _will get the last state(element) for the stack_
   _will compare between current and last state if they are equal we don't add it again _

   ``pushToUndoStack() {
   const currentState = this.contactForm.getRawValue();
   const lastState = this.undoStack[this.undoStack.length - 1];
   if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
   this.undoStack.push(JSON.parse(JSON.stringify(currentState)));
   }

   }``

---

5.  we call this function when the user click on undo button
    _will check if the undo have more than 1 (because by default it has one element (initial state he can't undo on it))_
    _when click undo should add it to redoStack_
    _here we will set the contactFormValue by the last element from undoStack after removing_
    ` undo() {
if (this.undoStack.length > 1) {
    this.redoStack.push(this.undoStack.pop());
    this.contactForm.setValue(this.undoStack[this.undoStack.length - 1], {
      emitEvent: false,
    });
}
}`

---

6. we call this function when click on redo button

   _will it work if the redoStack length greater than 0 means we did undo before at least once_

   _will remove the last element (Last In First Out)_

   _will set contact form value with it_
   _get the removed state from redo and push it to undo stack_

   `redo() {
if (this.redoStack.length > 0) {
const redoState = this.redoStack.pop();
this.contactForm.setValue(redoState, { emitEvent: false });
  this.pushToUndoStack();
    }
}`

---

7. we called this function when form focus out to push new state to undo stack

   ``onFormFocusOut() {
   this.pushToUndoStack();

}``

---

8. we disable the undo and redo button based on undoStack and redoStack length
   so this is condition which we disable based on it for undo button this.**undoStack.length <= 1** and this one for redo button **this.redoStack.length === 0**

## screens for my works :

1. Undo and Redo Disable State
   ![undo-redo-disable-state](<../../assets/images/undo-redo-disable state.png>)

2. Undo and Redo Enable State:
   ![undo-redo-enable-state](<../../assets/images/undo-redo-enable state.png>)
