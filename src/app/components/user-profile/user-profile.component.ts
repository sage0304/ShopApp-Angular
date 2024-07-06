import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userResponse?:UserResponse
  userProfileForm: FormGroup; // Object FormGroup to manage data in form
  token: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    // Create FormGroup and corresponding FormControl
    this.userProfileForm = this.formBuilder.group({
      fullname: [''],
      address: [''],
      password: ['', Validators.minLength(3)],
      retypePassword: ['', Validators.minLength(3)],
      date_of_birth: [Date.now()],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    debugger
    this.token = this.tokenService.getToken() ?? '';
    this.userService.getUserDetails(this.token).subscribe({
      next: (userOfResponse: any) => {
        debugger;
        this.userResponse = {
          ...userOfResponse,
          date_of_birth: new Date(userOfResponse.date_of_birth),
        }
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0, 10)
        });
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      },
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypePassword = formGroup.get('retypePassword')?.value;
      if(password !== retypePassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  save(): void {
    debugger
    if(this.userProfileForm.valid) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password: this.userProfileForm.get('password')?.value,
        retypePassword: this.userProfileForm.get('retypePassword')?.value,
        date_of_birth: new Date(this.userProfileForm.get('date_of_birth')?.value), 
      };

      this.userService.updateUserDetail(this.token, updateUserDTO)
        .subscribe({
          next: (response: any) => {
            this.userService.removeUserFromLocalStorage();
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
          }, 
          error: (error: any) => {
            alert(error.error.message);
          }
        });
    } else {
      if(this.userProfileForm.hasError('passwordMismatch')) {
        alert('Password and Retype Password must match.');
      }
    }
  }
}
