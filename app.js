var express = require('express')
var port = process.env.PORT || 8080
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost/nova')

app.set('views', './views/pages')
app.set('view engine','jade')
app.use(session({secret: 'keyboard cat'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'bower_components')))
app.locals.moment = require('moment')
app.listen(port)

console.log('novamovie started on port' + port)

app.use(function(req, res, next){
	var reqData = [];
	var size = 0;
	req.on('data', function (data) {
		console.log('>>>req on');
		console.log(data.toString());
		reqData.push(data);
		size += data.length;
	});
	req.on('end', function () {
		req.reqData = Buffer.concat(reqData, size);
	});
	next();
});

// index page
app.get('/', function(req,res){
	Movie.fetch(function(err, movie){//TODO: DRY2
		if(err) {
			console.log(err)

		}
		res.render('index', { title: 'nova Homepage', movie:movie })
	})

})

// detail page
app.get('/movie/:id',function(req,res){
	var id=req.params.id
	Movie.findById(id, function(err, movie){
		if(err){ console.log(err) }
		res.render('detail', {title:'nova '+movie.title, movie:movie});
	})
})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'movieNova 后台录入页',
		movie: {
			title : '',
			doctor : '',
			country : '',
			year : '',
			language : '',
			poster : '',
			summary : '',
			flash : ''
		}
	})
})

//admin update movie
app.get('/admin/update/:id', function(req, res){
	var id=req.params.id
	if(id){
		Movie.findById(id, function(err, movie){
			res.render('admin',{ title:'nova adminUpdatePage', movie:movie})
		})
	}
})

app.get('/tool/movie_save2', function(req,res){
	var o = new Movie({doctor:'kkkk'})
	o.save()
	res.render('debug')
})

app.get('/tool/movie_save', function(req,res){
	var var1=print_r({k1:'k1v',k2:'k2v', k3:'k3v'})
	res.render('debug', {var1:var1})
})

// admin post movie
app.post('/admin/movie/new',function(req,res){
	console.log(req.body);
	var id = req.body.movie._id
	var movieObj = req.body.movie

	var _movie

	if(id !== 'undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

			_movie = _.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+ movie._id)
			})
		})
	}else{
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})

		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}

			res.redirect('/movie/'+_movie._id)
		})
	}
})

// list page
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err, movie){//TODO:DRY2
		if(err){
			console.log(err)
		}

		res.render('list', { title: 'nova listPage', movie:movie })
	})
})