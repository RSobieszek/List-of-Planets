import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PlanetService {

    constructor(
        private httpClient: HttpClient) { }

    changePage(page: any) {
        return this.httpClient.get(page);
    }

}
