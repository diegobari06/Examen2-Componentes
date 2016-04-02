// eventosSismicos model

'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let	EventoSismicoSchema = new Schema({
	lugar: String,
 intensidad: String,
	tipo: String,
	hora: String,
	fecha: String

, codigo: String, coordenadas: String});

module.exports = mongoose.model('EventoSismico', EventoSismicoSchema);


