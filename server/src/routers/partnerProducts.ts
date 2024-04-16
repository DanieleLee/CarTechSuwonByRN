import { getPartnersProducts } from "#/controllers/partnerProducts";
import { isVerified, mustAuth } from "#/middleware/auth";
import fileParser from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { AudioValidationSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

/**요청자정보 인증 추가하기. */
router.post(
  "/create"
  // mustAuth,
  // isVerified,
  // fileParser,
  // validate(AudioValidationSchema),
  // createPartnerProducts
);

router.get("/list/:prodTypeParam/:pNo", getPartnersProducts);

export default router;
