import { Component, OnInit } from '@angular/core';
import { products } from '../../assets/files-challenge/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit  {

  products = products;
  searchTerm = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(product: any): void {

    this.router.navigate([
      `/${product.id}-${product.brand.toLowerCase().replace(/ /g, '')}`,
    ]);

  }

  get filteredProducts() {
    if (this.searchTerm) {
      return this.products.filter(product =>
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return this.products;
  }

}
