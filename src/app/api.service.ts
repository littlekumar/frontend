import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<any>{
    return this.http.get(this.baseUrl + '/products/',
     {headers: this.httpHeaders});
  }
  getOneProduct(productId:number): Observable<any>{
    return this.http.get(this.baseUrl + '/products/'+productId+'/',
     {headers: this.httpHeaders});
  }

  update_Product(product:any): Observable<any>{
//     const body = { name:(product as {name: any}).name, description:(product as {description: any}).description, price:(product as {price: any}).price};
    const body = { name:product.name, description:product.description, price:product.price};
//     return this.http.put(this.baseUrl + '/products/'+(product as {id: any}).id+'/', body,
    return this.http.put(this.baseUrl + '/products/'+product.id+'/', body,
     {headers: this.httpHeaders});
  }
  create_Product(product:any): Observable<any>{
     const body = { name:product.name, description:product.description, price:product.price};
     return this.http.post(this.baseUrl + '/products/', body,
     {headers: this.httpHeaders});
  }
  delete_Product(id:any): Observable<any>{
     return this.http.delete(this.baseUrl + '/products/'+id+'/',
     {headers: this.httpHeaders});
  }
}
