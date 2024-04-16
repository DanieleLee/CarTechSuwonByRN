import { Model, models, model, ObjectId, Schema } from "mongoose";

export interface PartnerProductsDocument<T = ObjectId> {
  _id: ObjectId;
  prodType: string;
  title: string;
  desc: string;
  price: number;
  img: [string];
  poster?: {
    url: string;
    publicId: string;
  };
  etc: {
    visit: boolean;
    muncheck: boolean;
    delivery: boolean;
    discount: number;
    accumulate: string;
    likes: number;
  };
  partId: string;
  partName: string;
  quantity: number;
}

const PartnerProductsSchema = new Schema<PartnerProductsDocument>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    prodType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: [{ type: String }],
    poster: {
      type: String,
    },
    etc: {
      type: Object,
      visit: Boolean,
      muncheck: Boolean,
      delivery: Boolean,
      discount: Number,
      accumulate: String,
      likes: { type: Number, default: 0 },
    },
    partId: {
      type: String,
      default: "654ec7f56b928a9c374b74b4",
    },
    partName: {
      type: String,
      default: "partner1",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PartnerProducts =
  models.PartnerProducts || model("PartnerProducts", PartnerProductsSchema);

export default PartnerProducts as Model<PartnerProductsDocument>;
