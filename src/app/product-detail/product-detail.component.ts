import { Component } from '@angular/core';
import { products } from '../../assets/files-challenge/products';
import { stockPrice } from '../../assets/files-challenge/stock-price';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: any;
  activeSku: any;
  stockUpdateTimer: Subscription;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.stockUpdateTimer = new Subscription();
  }

  ngOnInit(): void {

    const params = this.route.snapshot.paramMap.get('productInfo')!.split('-');
    const productId = parseInt(params[0], 10);

    this.product = products.find((product) => product.id == productId);
    this.activeSku = this.product.skus[0];
    this.updateStockAndPrice(this.activeSku.code);

    // Start the stock update timer
    this.stockUpdateTimer = interval(5000).subscribe(() => {
      this.updateStock();
    });

  }

  updateStock(): void {

    this.isLoading = true;

    const sku = this.product.skus[0];
    const priceAndStock = stockPrice.find((item) => item.code == sku.code);

    if (priceAndStock) {
      this.product = {
        ...this.product,
        stock: priceAndStock.stock
      };
    }
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    // Unsubscribe from the stock update timer
    this.stockUpdateTimer.unsubscribe();
  }

  updateStockAndPrice(skuCode: number): void {

    let a = stockPrice[0];

    const stockInfo = stockPrice.find((item) => item.code == skuCode);
    if (stockInfo) {
      this.product.stock = stockInfo.stock;
      this.product.price = stockInfo.price;
    }
  }

  onSkuClick(sku: any): void {
    this.activeSku = sku;
    this.updateStockAndPrice(sku.code);
  }

}
