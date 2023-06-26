import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/propducts';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(private ProductService: ProductsService) {}

  basket: IProducts[];
  basketSubscription: Subscription;

  ngOnInit(): void {
    this.basketSubscription =
      this.ProductService.getProductFromBasket().subscribe(
        (data) => (this.basket = data)
      );
  }

  deleteItemFromBasket(id: number) {
    this.ProductService.deleteProductFromBasket(id);
  }

  minusItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductService.deleteProductFromBasket(item.id).subscribe(() => {
        let index = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(index, 1);
      });
    } else {
      item.quantity -= 1;
      this.ProductService.updateProductToBasket(item).subscribe();
    }
  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
    this.ProductService.updateProductToBasket(item).subscribe();
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
