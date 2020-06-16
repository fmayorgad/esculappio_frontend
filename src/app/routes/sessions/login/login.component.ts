import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StartupService } from '../../../core/services/startup.service';
import { AuthenticationService } from '@services';

import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	loginButtonText = 'Continuar'; // El valor inicial, cuando apenas se va a consuiltar el tipo de usuario
	loadingButtonSpin = false;
	loadingButtonText = true;
	stateLoginProcess = 0; // 0 para cuando no se ha enviado email, 1 cuando el email ha traido o no el selector de institucion
	isSchool = false;

	schools: [];

	@ViewChild('myForm', { static: true }) myform: NgForm;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private snackBar: MatSnackBar,
		private startupService: StartupService
	) {
		// redirect to home if already logged in
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['/']);
		}

		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			schoolId: ['', [Validators.required]],
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = /*this.route.snapshot.queryParams['returnUrl'] ||*/ '/dashboard';

	}

	loginButtonEvent() {
		const emailstate = this.loginForm.controls.username.value;
		if (this.loginForm.controls.username.errors === null) { // solo si el campo email esta bien diligenciado
			if (this.stateLoginProcess === 0) {
				this.loadingButtonSpin = true;
				this.loadingButtonText = false;
				const email = this.loginForm.controls.username.value;
				const password = this.loginForm.controls.password.value;


				this.authenticationService.login({ email, password }).subscribe(
					response => {

						this.snackBar.open('Bienvenido de nuevo', 'Aceptar', {
							duration: 3000,
							panelClass: 'snackbarSuccess'
						});
						this.startupService.load().then(() => {
							this.router.navigate([this.returnUrl]);
						});
					},
					error => {
						this.snackBar.open(error, 'Aceptar', {
							duration: 3000,
							panelClass: 'snackbarError'
						});
					},
				);

			}
		}
	}

	ngOnInit() {

	}

	get f() {
		return this.loginForm.controls;
	}
}
