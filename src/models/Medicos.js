const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs')

const MedicoSchema = new Schema(
  {
    nombre: { type: String, trim: true },
    apellido: { type: String, trim: true },
    ci: { type: String },
    mpps: { type: String },
    email: { type: String, required: true, unique: true, trim: true },
    passwd1: { type: String, required: true },
    passwd2: { type: String, required: true },
    especialidad: { type: String, trim: true },
    tlf: { type: String, trim: true },
    direccion: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

MedicoSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

MedicoSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("medico", MedicoSchema);