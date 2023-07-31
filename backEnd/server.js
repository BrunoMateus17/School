const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
// server.use(bodyParser.json());

server.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers',"Origin, X-Requested,Content-Type,Accept");
	res.header('Access-Control-Allow-Methods',"PUT,POST,GET,DELETE,OPTIONS");
	bodyParser.json();
	next();
});

const db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'dbschool'
});

db.connect(function(error){
	if(error){
		console.log("Error");
	}else{
		console.log("suceefully");
	}
})


server.get("/api/student",(req,res)=>{
	var sql = "SELECT * FROM student";
	db.query(sql,function(error,result){
		if(error){
			console.log("Error connecting to DB");
		}else{
			res.send({status:true,data:result});
		}
	})
})
server.get("/api/student/:id",(req,res)=>{
	var studenid = req.params.id;
	var sql = "SELECT * FROM student WHERE id=" + studenid;
	db.query(sql,function(error,result){
		if(error){
			console.log("Error connecting to DB");
		}else{
			res.send({status:true,data:result});
		}
	})
})

server.put("/api/student/update/:id",(req,res)=>{
	let sql =
	"UPDATE student SET stname=' "+
	req.body.stname +
	"',course=' "+
	req.body.course +
	"',fee=' "+
	req.body.fee +
	"'WHERE id= "+
	req.params.id 
	db.query(sql,function(error,result){
		if(error){
			res.send({status:false,message:"Student UPDATED Failed"});
		}else{
			res.send({status:true,message:"Student UPDATED successfully"});
		}
	})
})

server.post("/api/student/add",(req,res)=>{
	let details = {
		stname: req.body.stname,
		course: req.body.course,
		fee: req.body.fee
	};
	let sql = "INSERT INTO student SET ?";
	db.query(sql,details,(error)=>{
		if(error){
			res.send({status:false,message:"Student created Failed"});
		}else{
			res.send({status:true,message:"Student created successfully"});
		}
	})
})
server.delete("/api/student/delete/:id",(req,res)=>{
	let sql = "DELETE FROM student WHERE id="+req.params.id+"";
	db.query(sql,(error)=>{
		if(error){
			res.send({status:false,message:"Student deleted Failed"});
		}else{
			res.send({status:true,message:"Student deleted successfully"});
		}
	})
})

server.listen(8085,function check(error){
	if(error){
		console.log("Error connecting to DB");
	}else{
		console.log("Started !");	
	}
});
