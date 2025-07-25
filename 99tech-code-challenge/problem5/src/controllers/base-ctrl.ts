import { Router } from "express";

export class BaseController {
    protected router: Router;

    constructor() {
        this.router = Router();
    }

    get Router(): Router {
        return this.router;
    }
}