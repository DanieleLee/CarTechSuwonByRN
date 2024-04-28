import {
  getCartProducts,
  getPartProdForCart,
  updateCartProducts,
} from "#/controllers/cart";
import { getPartnersProducts } from "#/controllers/partnerProducts";
import { isVerified, mustAuth } from "#/middleware/auth";
import fileParser from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { AudioValidationSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

/**요청자 인증정보 -> Client Param에서 가져옴 */
router.patch(
  "/update",
  updateCartProducts
  // mustAuth,
  // isVerified,
  // fileParser,
  // validate(AudioValidationSchema),
  // createPartnerProducts
);

/**요청자 인증정보 -> 서버단에서 token확인후 가져옴 */
router.get("/getCartItems", mustAuth, getCartProducts);
router.get("/getPartProds", mustAuth, getPartProdForCart);

export default router;
