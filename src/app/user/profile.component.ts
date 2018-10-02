import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { TOASTR_TOKEN, Toastr } from "../common/new.toastr.service";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;

    constructor(private authService:AuthService, private router:Router, 
        @Inject(TOASTR_TOKEN) private newToastr:Toastr) {

    }

    ngOnInit() {
        let firstName = new FormControl(this.authService.currentUser.firstName, Validators.required);
        let lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName:lastName
        });
    }

    saveProfile(formData) {
        if (this.profileForm.valid) {
            // this.authService.updateCurrentUser(formData.firstName, formData.lastName);
            this.authService.updateServerUser(formData.firstName, formData.lastName).subscribe(
                () => {
                    this.newToastr.warning('Profile Saved');
                    this.router.navigate(['/home']);        
                }
            );
        }
    }

    cancel() {
        this.router.navigate(['/home']);
    }

    isInvalidField(field:string) {
        if (field && this.profileForm.controls[field]) {
            return this.profileForm.controls[field].invalid && this.profileForm.controls[field].touched;
        }
        return false;
    }

    logout() {
        this.authService.logout()
            .subscribe(() => {
                this.router.navigate(['/user/login']);
            })
    }
}