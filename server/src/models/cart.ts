import { Model, ObjectId, Schema, model, models } from "mongoose";

export interface CartDocument<T = ObjectId> {
  _id: ObjectId;
  productId: string;
  ownerId: ObjectId;
  date: string;
}

const CartSchema = new Schema<CartDocument>({
  productId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart as Model<CartDocument>;
