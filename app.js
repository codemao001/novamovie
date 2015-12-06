var express = require('express')
var port = process.env.PORT || 8080
var app = express()

app.set('views', './views')
app.set('view engine','jade')
app.listen(port)

console.log('novamovie started on port' + port)

// index page
app.get('/', function(req,res){
	res.render('index',{
		title:'novamovie 首页'
	})
})

// detail page
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'novamovie 详情页'
	})
})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'novamovie 后台录入页'
	})
})

// list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'novamovie 列表页'
	})
})