import { Http } from "../http/Http"

export default class BaseHttpRepository {
    constructor(protected http: Http) {}
}