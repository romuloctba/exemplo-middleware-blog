var express = require('express')
	, app = express()
	, bodyParser = require('body-parser');

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8080;

	var router = express.Router();

/* Vamos colocar nosso Middleware aqui, depois */
var noMeio = function(req, res, next){
	var senha = req.query.senha || ''; 
	if(senha == 'senhasecreta'){
		next();
	} else {
		res.status(401).json({
			aviso: 'Parado aí, meliante!',
			message: 'Você não possui a senha, não pode entrar.'
		})
		}
};

	app.use('/', router);

	router.route('/teste') //inserimos noMeio como primeiro parâmetro
		.get(noMeio, function(req, res){
			if(!res.data){ res.data = {}; }
			res.data.message = "Olá, você está na rota /teste"
			res.json(res.data);
	});


	app.listen(port);
	console.log('conectado a porta ' + port);