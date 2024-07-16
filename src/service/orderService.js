// import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";

const orderService = {
	async dataGetAllOrder() {
		return orderModel.find();
	},

	async dataGetUserId(data) {
		return orderModel.find({ "customer.customerId": data });
	},

  async dataGetUserOrderId(orderId) {
    const order = await OrderModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(orderId) } },
      {
          $lookup: {
              from: 'users',
              localField: 'customer.customerId',
              foreignField: '_id',
              as: 'customer'
          }
      },
      { $unwind: '$user' },
      { $project: { 
          'order.customer': { 
              customerId: '$customer._id',
              addressIndex: '$customer.addressIndex',
              address: '$customer.address[3]' //$customer.address[3]
          },
          orderDate: 1,
          _id: 1,
          orderDetail: 1,
          totalPrice: 1,
          status: 1,
          createOn: 1 
      } }
  ]);

  if (!order || order.length === 0) {
      throw new Error("Order not found");
  }

  console.log(order)

  return order[0];

},

	async dataCreateOrderData(data) {
		// const order = new orderModel(data);
		// await order.save();
		// return order;
		return orderModel.insertMany(data);
	},
};
export default orderService;
