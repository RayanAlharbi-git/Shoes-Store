const mongoose = require("mongoose");

class BaseModel {
  constructor(modelName, schema) {
    this.model = mongoose.model(modelName, schema);
  }

  async create(data) {
    const instance = new this.model(data);
    return await instance.save();
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseModel;
