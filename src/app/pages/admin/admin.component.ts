import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {AdminService} from '../../services/admin/admin.service'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private api: AdminService, private _snackBar: MatSnackBar) { }

  hide = true;


  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message:string, type:string) {
    this._snackBar.open(message, type, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  adminForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  onSubmit() {
    console.log(this.adminForm.value);
    if(this.adminForm.valid) {
      this.api.postAdmin(this.adminForm.value).subscribe({
        next: (result : any) => {
          console.log(result);
          this.adminForm.reset()
          this.openSnackBar("Admin Added Successfully", "Success")
        },
        error: (err: any)=> {
          console.error(err)
          this.openSnackBar("Something went wrong", "Error")
        }
      })
    }
  }
}

