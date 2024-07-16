import express from "express";
import {
    getAllOrder,
    postCreateOrder,
    getUserId,
    getUserOrderId,
} from "../controller/orderController.js";

const router = express.Router();

// get All Order All user
router.get("/", getAllOrder);
// get All Order in user
router.get("/:userId", getUserId);
// get one Order in user
router.get("/:userId/:orderId", getUserOrderId); // may be delete :userId
// post create order
router.post("/", postCreateOrder);
export default router;
