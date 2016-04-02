'use strict';

// server.js (Express 4.0)

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect(dbURI);

// 
//Beer = require('./app/api/models/beer');
let EventoSismico = require('./app/api/models/eventoSismico');

// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// test router
// apiRouter.get('/', (req, res) => {
// 	res.json({ message: 'welcome to out api' });
// });

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /beers
apiRouter.route('/eventosSismicos')
	// create a beer (http://localhost:8080/api/beers)
	.post((req, res) => {
		let evento = new EventoSismico();

		evento.lugar = req.body.lugar;
		evento.intensidad = req.body.intensidad;
		evento.tipo = req.body.tipo;
		evento.hora = req.body.hora;
		evento.fecha = req.body.fecha;
		evento.codigo = req.body.codigo;
		evento.coordenadas = req.body.coordenadas;
			
		evento.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Evento sismico registrado!' });
		});
	})
	// get all eventosSismicos(http://localhost:8080/api/eventosSismicos)
	.get((req, res) => {
		EventoSismico.find((err, eventosSismicos) => {
			if (err) res.send(err);
			res.json(eventosSismicos);
		});
	});


// apiRouter.route('/eventosSismicos/:eventosismico_id')

// 	.get((req, res) => {
// 		EventoSismico.findById(req.params.eventosismico_id, (err, eventosismico) => {
// 			if (err) res.send(err);
// 			res.json(eventosismico);
// 		});
// 	})
	

apiRouter.route('/eventos/lugar/query')
	.get((req,res)=> {
		let lugarString = req.query.lugar;
		EventoSismico.find({"lugar":{"$regex": actorString}},(err,eventosSismicos) => {
			if (err) res.send(err);
			res.json(eventosSismicos);
		})
	});


apiRouter.route('/eventos/intensidad/query')
	.get((req,res)=> {
		let intensidadString = req.query.intensidad;
		EventoSismico.find({"intensidad":{"$regex": actorString}},(err,eventosSismicos) => {
			if (err) res.send(err);
			res.json(eventosSismicos);
		})
	});


apiRouter.route('/eventos/fecha/query')
	.get((req,res)=> {
		let fechaString = req.query.fecha;
		EventoSismico.find({"fecha":{"$regex": actorString}},(err,eventosSismicos) => {
			if (err) res.send(err);
			res.json(eventosSismicos);
		})
	});

// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
