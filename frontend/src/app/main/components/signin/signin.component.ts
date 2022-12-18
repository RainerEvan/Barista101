import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  showError: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    if(this.authService.accountValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.generateSigninForm();
  }

  generateSigninForm(){
    this.signinForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  get username(){
    return this.signinForm.get('username');
  }

  get password(){
    return this.signinForm.get('password');
  }

  signin():void{
    if(this.signinForm.valid){
      const formData = this.signinForm.value;

      console.log(formData);
      this.authService.signin(formData).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

}
