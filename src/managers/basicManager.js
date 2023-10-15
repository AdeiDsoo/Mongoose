export default class BasicManager {
    constructor(model) {
      this.model = model;
    }
  
    async findAll(options) {
      const result= await this.model.paginate({}, options)
   
      const info= {
        status:'success',
        payload:result.docs,
        count:result.totalDocs, 
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `http://localhost:8080/api/users?page=${result.prevPage}` :null,
        nextLink: result.hasNextPage ? `http://localhost:8080/api/users?page=${result.nextPage}` :null
      };
      return info
      // .lean();
    }
async findAllSimple(){
  return this.model.find().lean();
}
    async findById(id) {
      return this.model.findById(id);
    }
  
    async createOne(obj) {
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