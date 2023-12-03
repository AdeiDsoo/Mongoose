import { productsModel } from "../../models/products.model.js";
import BasicMongo from "./basic.mongo.js";

class ProductsMongo extends BasicMongo {
  constructor() {
    super(productsModel);
  }

  async findAllProducts(obj) {
    const { limit, page, sort: sortPrice, ...queryFilter } = obj;
    const effectiveLimit = limit || 10;

    const effectivePage = page || 1;
    const response = await productsModel.paginate(queryFilter, {
      limit: effectiveLimit,
      page: effectivePage,
      lean: true,
    });

    const sortedPayload = response.docs.sort((a, b) => {
      if (sortPrice === "asc") {
        return a.price - b.price;
      } else if (sortPrice === "desc") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    const info = {
      status: "success",
      payload: sortedPayload,
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

export const productsMongo = new ProductsMongo();
