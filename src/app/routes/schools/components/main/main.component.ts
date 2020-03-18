import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from '../../../../services';
import { createSchoolDialogComponent } from '../dialogs/createSchool/create.component';
import { EditSchoolDialogComponent } from '../dialogs/edit/edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleGuard } from '../../../../helpers/role.guard';

@Component({
	selector: 'app-schools.module-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class SchoolsModuleMainComponent implements OnInit {
	constructor(
		public dialog: MatDialog,
		private shoolService: SchoolService,
		private _snackBar: MatSnackBar,
		private roleGuard: RoleGuard,
	) { }
	// bodycardtitled variables
	title = 'Colegios';
	icon = 'business';
	color = '#e53935';
	subtitle = 'Listado de instituciones creadas en la plataforma';
	schools = []
	sectors = {
		1: 'Oficial',
		2: 'Privado',
		3: 'Público'
	};
	mainTablePaginationOptions = [10, 15, 50];

	noData = false;
	isLoading = true;
	nodataheight = '100px';
	nodatamessage = 'No hay datos para mostrar';

	displayedColumns: string[] = ['name', 'nit', 'address', 'neighborhood', 'phones', 'fax', 'cityName', 'acciones'];
	dataSource = new MatTableDataSource<school>(this.schools);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	canview(permission) {
		return this.roleGuard.canview('colegios', permission);
	}

	getAll() {
		this.shoolService.getAllSchools().subscribe(
			data => {
				console.log(data);
				data.map(c => c.sectorName = this.sectors[c.sectorId]);
				this.dataSource = new MatTableDataSource<any>(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.isLoading = false;
				if (data.length == 0) { this.noData = true }
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
	}

	create() {
		const dialogRef = this.dialog.open(createSchoolDialogComponent, { disableClose: true });

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});
	}

	edit(element) {
		const dialogRef = this.dialog.open(EditSchoolDialogComponent, { disableClose: true, data: element });

		dialogRef.afterClosed().subscribe(result => {
			if (result.state === 1) {
				this._snackBar.open(result.message, 'Aceptar', {
					duration: 3000,
				});
				this.getAll();
			}
			if (result.state === 0) {
				this._snackBar.open(result.message, 'Aceptar', {
					duration: 3000,
				});
			}
		});
	}

	ngOnInit() {
		this.displayedColumns = ['name', 'nit', 'address', 'neighborhood', 'phones', 'fax', 'cityName', 'acciones'];
		this.dataSource = new MatTableDataSource<school>(this.schools);
		this.mainTablePaginationOptions = [5, 15, 50];
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.getAll();
	}
}

export interface school {
	id: number;
	name: string;
	nit: string;
	sectorName: string;
	sectorId: number;
	address: string;
	neighborhood: string;
	phones: string;
	fax: string;
	countryId: number;
	countryName: string;
	departmentId: number;
	departmentName: string;
	cityId: number;
	cityName: string;
	comuneId: number;
	comuneName: string;
	imgPath: string;
}

// const schools: school[] = [
//   { id: 1, name: 'Institución 1', nit: "123123123", sectorId: 1, sectorName: "Oficial", address: "Carrera 5 #23", neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", countryId: 12, countryName: "Colombia", departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path" },
//   // { name: 'Institución 2', resolution: 4.0026, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 3', resolution: 6.941, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 4', resolution: 9.0122, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 5', resolution: 10.811, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 6', resolution: 12.0107, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 7', resolution: 14.0067, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 8', resolution: 15.9994, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 9', resolution: 18.9984, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 10', resolution: 20.1797, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 11', resolution: 22.9897, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 12', resolution: 24.305, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 13', resolution: 26.9815, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 14', resolution: 28.0855, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 15', resolution: 30.9738, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 16', resolution: 32.065, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 17', resolution: 35.453, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 18', resolution: 39.948, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 19', resolution: 39.0983, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
//   // { name: 'Institución 20', resolution: 40.078, nit: "123123123", sectorId: 1, sectorName: "Oficial", icfes: "126554A", dane: "2321", address: "Carrera 5 #23",neighborhood: "Barrios n", phones: "3256994 , 665559", fax: "26544555", postalcode: "365985", countryId: 12, countryName: "Colombia",departmentId: 1, departmentName: "Valle del Cauca", cityId: 1, cityName: "Cali", comuneId: 1, comuneName: "23", imgPath: "path"},
// ];
