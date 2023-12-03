export default class BasicMongo {

  constructor(model, populateOption) {
    this.model = model;
    this.populateOption = populateOption;
  }
  
  async findAll() {
    return this.model.find().populate(this.populateOption);
  }

  async findById(id) {
    return this.model.findById(id).populate(this.populateOption);
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
