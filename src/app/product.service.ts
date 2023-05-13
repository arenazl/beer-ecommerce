import { Injectable } from '@angular/core';

import { products } from '../assets/files-challenge/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts() {
    return products;
  }

  getProduct(id: number) {
    return products.find(product => product.id === id);
  }
}
