import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/propducts';
import { ProductsService } from 'src/app/services/products.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProducts[];
  productsSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  constructor(
    private ProductService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //это нужно сделать условием
    this.canEdit = true;

    this.productsSubscription = this.ProductService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );

    this.basketSubscription =
      this.ProductService.getProductFromBasket().subscribe((data) => {
        this.basket = data;
      });
  }

  openDialog(products?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    //диалоговое окно не закрывается
    dialogConfig.disableClose = true;
    dialogConfig.data = products;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) this.updateItem(data);
        else this.postData(data);
      }
    });
  }

  deleteItem(id: number) {
    this.ProductService.deleteProduct(id).subscribe(() =>
      this.products.find((item) => {
        if (id === item.id) {
          let index = this.products.findIndex((data) => data.id === id);
          this.products.splice(index, 1);
        }
      })
    );
  }

  postData(data: IProducts) {
    this.ProductService.postProduct(data).subscribe((data) =>
      this.products.push(data)
    );
  }

  updateItem(product: IProducts) {
    this.ProductService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data;
        else return product;
      });
    });
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.ProductService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductService.updateProductToBasket(product).subscribe();
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
