import {
  UpdateCartProductsRequest,
  getCartProductsRequest,
} from "#/@types/cart";
import Cart from "#/models/cart";
import PartnerProducts from "#/models/partnerProducts";
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
  const ownerId = req.user.id;
  console.log("cartttt");

  if (ownerId) {
    const cartProducts = (await Cart.find({ ownerId: ownerId })).map((item) => {
      return {
        id: item._id,
        date: item.date,
        ownerId: item.ownerId,
      };
    });

    if (!cartProducts) return res.json({ cartProducts: [] });
    console.log(cartProducts);
    res.json({
      cartProducts: cartProducts,
    });
  }
};

export const getPartProdForCart: RequestHandler = async (
  req: getCartProductsRequest,
  res
) => {
  const owner = req.user.id;

  if (owner) {
    const partProducts = await Cart.aggregate([
      { $match: { ownerId: owner } },
      { $addFields: { productId: { $toObjectId: "$productId" } } },
      {
        $lookup: {
          from: "partnerproducts",
          localField: "productId",
          foreignField: "_id",
          as: "partProdInfo",
        },
      },
      { $unwind: "$partProdInfo" },
      {
        $project: {
          //   _id: 0,
          //   id: "$all._id",
          _id: "$partProdInfo._id",
          date: "$all.date",
          title: "$partProdInfo.title",
          desc: "$partProdInfo.desc",
          price: "$partProdInfo.price",
          img: "$partProdInfo.img",
          poster: "$partProdInfo.poster",
          etc: "$partProdInfo.etc",
          quantity: "$partProdInfo.quantity",
        },
      },
      { $sort: { date: -1 } },
    ]);

    console.log("partProducts>>>>");
    console.log(partProducts);

    res.json({ partProducts });
  }
};
