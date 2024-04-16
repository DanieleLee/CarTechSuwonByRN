import { Request } from "express";

export interface UpdateCartProductsRequest extends Request {
  body: {
    id: string;
    ownerId: string;
    date: string;
  };
}

export interface getCartProductsRequest extends Request {
  body: {
    ownerId: string;
  };
}
