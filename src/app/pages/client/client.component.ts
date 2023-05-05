import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ClientService} from '../../services/client/client.service'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  constructor(private api: ClientService, private _snackBar: MatSnackBar) { }

  hide = true;


  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message:string, type:string) {
    this._snackBar.open(message, type, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  clientForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [ Validators.email]),
  })

  onSubmit() {
    console.log(this.clientForm.value);
    if(this.clientForm.valid) {
      this.api.postClient(this.clientForm.value).subscribe({
        next: (result : any) => {
          console.log(result);
          this.clientForm.reset()
          this.openSnackBar("Client Added Successfully", "Success")
        },
        error: (err: any)=> {
          console.error(err)
          this.openSnackBar("Something went wrong", "Error")
        }
      })
    }
  }
}
