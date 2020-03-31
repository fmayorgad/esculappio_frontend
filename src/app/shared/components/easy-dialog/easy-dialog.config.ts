import { MatDialogConfig } from '@angular/material/dialog';

export interface DialogData extends MatDialogConfig {
  title: string;
  description?: string;
  buttons: DialogBtns[];
}

export interface DialogBtns {
  type?: '' | 'primary' | 'accent' | 'warn';
  text: string;
  onClick: () => void;
}
