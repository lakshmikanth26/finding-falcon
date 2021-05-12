import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/layouts/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialogService: MatDialog, private router: Router) {}

  showError(msg: string) {
    var dialogRef = this.dialogService.open(DialogComponent, {
      width: '200px',
      data: {message: msg}}
      );

    dialogRef.afterClosed().subscribe(res => {
      this.router.navigate(['/']);
    })
  }
}
