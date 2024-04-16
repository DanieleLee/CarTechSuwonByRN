import {
  UpdateCartProductsRequest,
  getCartProductsRequest,
} from "#/@types/cart";
import Cart from "#/models/cart";
import { RequestHandler } from "express";

export const updateCartProducts: RequestHandler = async (
  req: UpdateCartProductsRequest,
  res
) => {
  // ownerId는 router -> mustAuth에서 user model에서 가져오는데 여기서는 클라이언트에서 받는걸로
  const { id, ownerId, date } = req.body;

  const cart = await Cart.findOne({ productId: id, ownerId: ownerId });

  if (cart) {
    return res.status(404).json({ error: "Already in the Cart!!" });
  } else {
    const newCart = new Cart({
      productId: id,
      ownerId: ownerId,
      date: date,
    });

    await newCart.save();

    res.status(201).json({
      productId: id,
      ownerId: ownerId,
      date: date,
    });
  }
};

export const getCartProducts: RequestHandler = async (
  req: getCartProductsRequest,
  res
) => {
  const { ownerId } = req.body;

  if (ownerId) {
    const cartProducts = await Cart.find({ ownerId: ownerId });

    if (!cartProducts) return res.json({ cartProducts: [] });

    res.json({
      cartProducts: cartProducts,
    });
  }
};
