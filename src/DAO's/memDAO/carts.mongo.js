import { cartsModel } from "../../models/carts.model.js";
import { logger } from "../../utils/winston.js";
import BasicMongo from "./basic.mongo.js";

class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel, "productsCart.idProduct");
    }
 async updateThisCart(id, obj) {
logger.info(obj, 'obj cartsmongo')
    const cart = await cartsModel.findOneAndUpdate(
      { _id: id },
      obj,
      { new: true }
    );

    return cart;
  }

 
    async findAllCarts(obj) {
        const { limit, page, ...queryFilter } = obj;

        const effectiveLimit = limit || 10;
        const effectivePage = page || 1;

        const response = await cartsModel.paginate(queryFilter, {
            limit: effectiveLimit,
            page: effectivePage,
            lean: true,
        });
        const info = {
            status: "success",
            payload: response.docs,
            count: response.totalDocs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage
                ? `http://localhost:8080/api/users?page=${response.prevPage}`
                : null,
            nextLink: response.hasNextPage
                ? `http://localhost:8080/api/users?page=${response.nextPage}`
                : null,
        };

        return info;
    }
}

export const cartsMongo = new CartsMongo();
