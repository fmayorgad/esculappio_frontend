import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StartupService } from '../../../core/services/startup.service';

import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';

import { AuthenticationService, SchoolService } from '../../../services';

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
		private schoolService: SchoolService,
		private snackBar: MatSnackBar,
		private startupService: StartupService
	) {
		// redirect to home if already logged in
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['/']);
		}

		this.loginForm = this.formBuilder.group({
			username: ['super@sigasac.com', [Validators.required, Validators.email]],
			password: ['Hola@321', [Validators.required]],
			schoolId: ['', [Validators.required]],
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = /*this.route.snapshot.queryParams['returnUrl'] ||*/ '/dashboard';

	}

	emailClick() {
		this.loadingButtonSpin = false;
		this.loadingButtonText = true;
		this.isSchool = false;
		this.stateLoginProcess = 0;
		this.loginButtonText = 'Continuar';
		this.loginForm.get('schoolId').reset();
		this.loginForm.get('password').reset();
	}

	loginButtonEvent() {
		const emailstate = this.loginForm.controls.username.value;
		// esto reinicia el formulario
		// cuando solo hay un email y no se ha buscado su tipo
		if (this.loginForm.controls.username.errors === null) { // solo si el campo email esta bien diligenciado
			if (this.stateLoginProcess === 0) {
				this.loadingButtonSpin = true;
				this.loadingButtonText = false;
				const email = this.loginForm.controls.username.value;
				this.schoolService
					.getSchoolsByUserEmail(`${this.f.username.value}`)
					.subscribe(
						data => {
							console.log(this.loginForm);
							this.loginForm.markAsUntouched();
							this.loginForm.markAsPristine();
							if (data.length > 0) {
								this.schools = data;
								this.isSchool = true;
							} else {
								this.isSchool = false;
							}
							this.myform.resetForm({ username: emailstate, schoolId: '', password: 'Hola@321' });
							this.loadingButtonSpin = false;
							this.loadingButtonText = true;
							this.loginButtonText = 'Iniciar sesión';
							this.stateLoginProcess = 1;
						},
						error => {
							this.snackBar.open('Error: ' + error.message, 'Aceptar', {
								duration: 5000,
							});
							this.loadingButtonSpin = false;
							this.loadingButtonText = true;
						}
					);
			} else {

				console.log(this.loginForm.controls)
				// se ejecuta cuando ya se ha validado el email
				// Es un colegio
				if (this.stateLoginProcess === 1 && this.isSchool === true && this.loginForm.controls.password.errors === null && this.loginForm.controls.schoolId.errors === null) {
					this.authenticationService.login(
						this.f.username.value,
						this.f.password.value,
						this.f.schoolId.value,
					).subscribe(
						data => {
							this.startupService.load().then(() => {
								this.router.navigate([this.returnUrl]);
							}
							);
						},
						error => {
							this.snackBar.open('Error: ' + error.message, 'Aceptar', {
								duration: 5000,
							});
							this.loading = false;
						});
				}
				// Es un superadmin
				if (this.stateLoginProcess === 1 && this.isSchool === false && this.loginForm.controls.password.errors === null) {
					this.authenticationService.login(
						this.f.username.value,
						this.f.password.value
					).subscribe(
						data => {
							this.startupService.load().then(() => {
								this.router.navigate([this.returnUrl]);
							});
						},
						error => {
							this.snackBar.open('Error: ' + error.message, 'Aceptar', {
								duration: 5000,
							});
							this.loading = false;
						});
				}
			}
		}
	}

	ngOnInit() {

	}

	get f() {
		return this.loginForm.controls;
	}

	login() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		this.authenticationService.login(
			this.f.username.value,
			this.f.password.value,
			this.f.schoolId.value,
		)

			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
				},
				error => {
					// this.alertService.error(error);
					this.loading = false;
				});
	}

	getSchoolsByUserEmail() {
		this.schoolService
			.getSchoolsByUserEmail(`${this.f.username.value}`)
			.subscribe(data => {
				this.schools = data;
				this.isSchool = true;
			});
	}
}
