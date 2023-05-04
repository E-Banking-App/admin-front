import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {AgenciesService} from '../services/agencies.service'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.scss']
})
export class AgenciesComponent {

  constructor(private api: AgenciesService, private _snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message:string, type:string) {
    this._snackBar.open(message, type, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  agenciesForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  onSubmit() {
    console.log(this.agenciesForm.value);
    if(this.agenciesForm.valid) {
      this.api.postAgency(this.agenciesForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.agenciesForm.reset()
          this.openSnackBar("Agency Added Successfully", "Success")
        },
        error: (err)=> {
          console.error(err)
          this.openSnackBar("Something went wrong", "Error")
        }
      })
    }
  }
}
