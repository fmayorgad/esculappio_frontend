import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../../../../../../services/configuration/questions/questionsService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-banks-dialogs-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class QuestionEditComponent {
  title = 'Editando pregunta';
  icon = 'edit';
  color = '#2196f3';
  subtitle = 'Editar propiedades de la pregunta';

  mainForm = new FormGroup({
    title: new FormControl(
      this.incomingdata.title,
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    step_type_id: new FormControl(
      this.incomingdata.stepTypeId,
      [
        Validators.required,
      ],
    ),
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<QuestionEditComponent>,
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

  edit() {

    const tmp = {
      title: this.mainForm.controls.title.value,
      stepTypeId: this.mainForm.controls.step_type_id.value
    };

    this.questionsService
      .editQuestion(this.incomingdata.id, tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Pregunta editada satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al editada la pregunta. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }
}
