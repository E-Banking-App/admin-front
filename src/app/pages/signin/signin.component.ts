import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {SigninService} from '../../services/signin/signin.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {

    hide = true;

    constructor(private api: SigninService, private router: Router) { }

    signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    onSubmit() {
      if(this.signinForm.valid) {
        console.log(this.signinForm.value);
        this.api.postSignin(this.signinForm.value).subscribe({
          next: (result : any) => {
            console.log("Admin Sign In Successfully", result);
            localStorage.setItem('token', result.token);
            this.signinForm.reset()
            this.router.navigate(['/home']);
          },
          error: (err: any)=> {
            console.error("Something went wrong", err)
          }
        })
      }
    }
}
