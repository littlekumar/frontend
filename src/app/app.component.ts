import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule } from '@angular/common';
import {ApiService} from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports:[CommonModule,HttpClientModule,FormsModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [ApiService]
})
export class AppComponent {
  products = [{id:1,name:'test', description:'test', price:0}];
  selectedProduct;

  constructor(private api:ApiService){
    this.getProducts();
    this.selectedProduct = {id:-1, name:'test', description:'test desc', price:0};
  }
  getProducts = () => {
    this.api.getAllProducts().subscribe(
      data => {
        this.products = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  productClicked = (product:object) => {
    const productId = (product as {id: any}).id;
    console.log(productId);
    this.api.getOneProduct(productId).subscribe(
      data => {
        this.selectedProduct = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  updateProduct = () => {
    this.api.update_Product(this.selectedProduct).subscribe(
      data => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }
  createProduct = () => {
    this.api.create_Product(this.selectedProduct).subscribe(
      data => {
        this.products.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteProduct = () => {
    this.api.delete_Product(this.selectedProduct.id).subscribe(
      data => {
        this.getProducts();
      },
      error => {
        console.log(error);
      }
    );
  }
}
