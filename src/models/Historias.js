const mongoose = require('mongoose')
const { Schema } = mongoose;

const HistoriasSchema = new Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    tlf: { type: String },
    tto: {type: String, required: true},
    direccion: { type: String, required: true },
    antecedentes: { type: String, required: true },
    examen: { type: String, required: true },
    diagnostico: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Paciente", HistoriasSchema);