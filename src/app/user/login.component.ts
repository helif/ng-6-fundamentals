import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    userName;
    password;
    mouseOverLogin = false;
    loginInvalid = false;

    constructor(private authService:AuthService, private router:Router) {

    }

    login(formData) {
        // this.authService.loginUser(formData.userName, formData.password);
        this.authService.loginServerUser(formData.userName, formData.password)
            .subscribe((resp) => {
                if (resp) {
                    this.router.navigate(['/home']);
                } else {
                    this.loginInvalid = true;
                }
            })
    }
    
    cancel() {
        this.router.navigate(['/home']);
    }
}