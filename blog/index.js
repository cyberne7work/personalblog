var express         =require("express");
var index           =express();
var bodyParser      =require("body-parser");
var methodoverride  =require("method-override");
var mongoose        =require('mongoose');
var content         =require("./models/content");

mongoose.connect('mongodb://localhost/nextobject');
index.use(bodyParser.urlencoded({extended:true}));
index.use(methodoverride("_method"));
index.use(express.static("public"));
index.set("view engine","ejs");




//Home Page

index.get("/",function(req,res){
    content.find({},function(err,foundcontent){
        if(err){
            console.log(err);
        }
        else{
            console.log("in home page");
            res.render("blogs/home",{content:foundcontent});
        }
    })
    
});

//single post show page
index.get("/:id",function(req, res) {
    content.findById(req.params.id,function(err,foundcontent){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundcontent);
            res.render("blogs/show",{content:foundcontent});
        }
    })
});


index.get("/technology",function(req,res){
    res.render("blogs/technology");
});

index.get("/stories",function(req, res) {
    res.render("blogs/stories");
});

index.get("/travel",function(req, res) {
    res.render("blogs/travel");
});

index.get("/work",function(req, res) {
    res.render("blogs/work");
});

index.get("/newpost",function(req, res) {
    res.render("blogs/newpost");
});


//new post router

index.post("/",function(req,res){
    var image=req.body.image;
     var paragraph=req.body.paragraph;
    var tag=req.body.tag;
   var heading=req.body.heading;
    
    var newcontent={image:image,paragraph:paragraph,tag:tag,heading:heading};
    content.create(newcontent,function(err,done){
        if(err){
            console.log(err);
        }
        else{
            console.log("Added Sucessfully");
            console.log(done);
             res.redirect("/");
        }
    });
   
});

//edit post

index.get("/:id/edit",function(req, res) {
    content.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }
        else{
            console.log(found);
            res.send("In edit page");
        }
    })
});









index.listen(process.env.PORT,process.env.ID,function(req,res){
    console.log("Blog Server is started");
})