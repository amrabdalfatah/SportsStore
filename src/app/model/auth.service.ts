import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()

export class AuthService {
    constructor(private dataSoure: RestDataSource) { }

    authenticate(username: string, password: string): Observable<boolean> {
        return this.dataSoure.authenticate(username, password);
    }

    get authenticated(): boolean {
        return this.dataSoure.auth_token != null;
    }

    clear() {
        this.dataSoure.auth_token = undefined;
    }
}