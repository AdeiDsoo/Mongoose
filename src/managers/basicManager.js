export default class BasicManager {
  constructor(model) {
    this.model = model;
  }

  async findAll(options) {
    const filter = {};
    if (options.category) {
      filter.category = options.category;
    }

    const result = await this.model.paginate(filter, options);

    const sortedPayload = result.docs.sort((a, b) => {
      if (options.sort === "asc") {
        return a.price - b.price;
      } else if (options.sort === "desc") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
    const info = {
      status: "success",
      payload: sortedPayload,
      count: result.totalDocs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `http://localhost:8080/api/users?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `http://localhost:8080/api/users?page=${result.nextPage}`
        : null,
    };
    return info;
  }
  async findAllSimple() {
    return this.model.find().populate("productsCart.idProduct").lean();
  }
  async findById(id) {
    return this.model.findById(id);
  }

  async createOne(obj) {
    return this.model.create(obj);
  }

  async updateOne(id, obj) {
    const updatedDocument = await this.model.findOneAndUpdate(
      { _id: id },
      obj,
      { new: true }
    );
    return updatedDocument;
  }

  async deleteOne(id) {
    return this.model.deleteOne({ _id: id });
  }
}
