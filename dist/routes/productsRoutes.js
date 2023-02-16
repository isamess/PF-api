"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// router.get("/", productControllers.getProducts);
// router.get("/:id", productControllers.getProductId);
router.delete("/:id");
router.put("/:id");
module.exports = router;
// este es el enrutador
//# sourceMappingURL=productsRoutes.js.map