import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) this.isNew = false;
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    year: new FormControl(this.data?.year ?? ''),
    autor: new FormControl(this.data?.autor ?? ''),
    genre: new FormControl(this.data?.genre ?? ''),
    volume: new FormControl(this.data?.volume ?? ''),
    language: new FormControl(this.data?.language ?? ''),
  });

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      autor: this.myForm.value.autor,
      genre: this.myForm.value.genre,
      volume: this.myForm.value.volume,
      language: this.myForm.value.language,
      image: 'assets/images/book.jpg',
      configure: {
        autor: this.myForm.value.autor,
        genre: this.myForm.value.genre,
        volume: this.myForm.value.volume,
        language: this.myForm.value.language,
      },
    };

    console.log(this.myForm.value);

    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {}
}
