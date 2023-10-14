export default class BasicManager {
    constructor(model) {
      this.model = model;
    }
  
    async findAll() {
      return this.model.find().lean();
    }
  
    async findById(id) {
      return this.model.findById(id);
    }
  
    async createOne(obj) {
      console.log("obj", obj);
      return this.model.create(obj);
    }
  
    async updateOne(id, obj) {
      const updatedDocument = await this.model.findOneAndUpdate({ _id: id }, obj, { new: true });;
      return updatedDocument;
    }

    async deleteOne(id) {
      return this.model.deleteOne({ _id: id });
    }
  }