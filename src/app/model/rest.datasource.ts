import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, map } from 'rxjs';
import { Order } from './order.model';

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()

export class RestDataSource {

    baseUrl: string;
    auth_token?: string;

    // http://localhost:3500

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    // http://localhost:3500/products

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products");
    }

    // post
    // http://localhost:3500/orders

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order);
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(
            this.baseUrl + 'login',
            {
                name: user, password: pass
            }
        ).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    }
}