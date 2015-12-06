var express = require('express')
var port = process.env.PORT || 8080
var path = require('path')
var app = express()
var session = require('express-session');

app.set('views', './views/pages')
app.set('view engine','jade')
app.use(session({secret: 'keyboard cat'}))
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('novamovie started on port' + port)

// index page
app.get('/', function(req,res){
	res.render('index',{
		title:'movieNova 首页',
		movies: [{
			title: '机械战警',
			_id: 1,
			poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
		},{
			title: '机械战警',
			_id: 2,
			poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5"
		}]
	})
})

// detail page
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'movieNova 详情页',
		movies: {
			title : "机械战警",
			doctor : "和塞",
			country : "美国",
			language : "英语",
			poster : "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
			summary : "《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。",
			flash : "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf"
		}
	})
})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'movieNova 后台录入页',
		movies: {
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

// list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'movieNova 列表页',
		movies: [{
			title: '机械战警',
			_id: 1,
			doctor : "和塞",
			country : "美国",
			year: 2014,
			poster: "http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
			language: '英语',
			summary : "《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。",
		 	flash : "http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf"
		}]
	})
})