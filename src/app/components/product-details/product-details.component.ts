import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/propducts';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProducts;
  productSubscribtion: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productSubscribtion = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });

    this.basketSubscription =
      this.ProductService.getProductFromBasket().subscribe((data) => {
        this.basket = data;
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
}
