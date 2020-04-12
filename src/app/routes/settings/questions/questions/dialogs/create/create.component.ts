import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../../../../../../services/configuration/questions/questionsService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-banks-dialogs-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class QuestionCreateComponent {
  title = 'Crear';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Crear Pregunta';

  mainForm = new FormGroup({
    title: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    step_type_id: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<QuestionCreateComponent>,
    private questionsService: QuestionsService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  get form() {
    return this.mainForm.controls;
  }

  test() {
    console.log(this.mainForm.valid);
  }

  create() {

    const tmp = {
      title: this.mainForm.controls.title.value,
      stepTypeId: this.mainForm.controls.step_type_id.value
    };

    this.questionsService
      .create(this.incomingdata.id, tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Pregunta creada satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al crear la pregunta. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }
}
