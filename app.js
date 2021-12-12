var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mlabuser:0Timongodbp9@mydb-jsu8e.mongodb.net/webdata?retryWrites=true&w=majority" ,{useNewUrlParser: true,useUnifiedTopology: true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var schema = new mongoose.Schema({
    name: String,
    genre: [String],
    category:[String],
    quality:[String],
    size:[Number],
    title:String,
    added:Date,
    released:Date,
    rating:String,
    cast:String,
    storyline:String,
    thumbnail:String,
    screenshot:[String],
    download:[
        {
            text:String,
            value:String
        }
    ],
    keyword:[String]
});

var movie = mongoose.model("movie",schema);
var reportSchema = new mongoose.Schema({
    content: String,
    name:String,
    email:String
});

var report = mongoose.model("report",reportSchema);
//home route
app.get("/",function(req,res){
    res.redirect("/p/1");
});

//page
app.get("/p/:page", function(req,res){
    movie.aggregate([{ "$sort" : { "added" : -1} }],function(err,found){
            var total;
            var count = found.length;
            if(count % 20 > 0){
                total = Math.floor(count/20) + 1;
            }else{
                total = Math.floor(count/20);
            }
            var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
            res.render("index",{movies:go,cur_page:parseInt(req.params.page),tot_page:total});
    });
});

//category route
app.get("/category/:cat_name",function(req,res){
    res.redirect("/category/"+req.params.cat_name+"/p/1");
});

app.get("/category/:cat_name/p/:page",function(req,res){
    movie.aggregate([
        { "$match": { "category":req.params.cat_name}},
        { "$sort" : { "added" : -1} }
        ],function(err,found){
            if(err){
                res.redirect("back");
            }else{
                var total;
                var count = found.length;
                if(count == 0){
                    res.render("noresult");
                }else{
                    if(count % 20 > 0){
                        total = Math.floor(count/20) + 1;
                    }else{
                        total = Math.floor(count/20);
                    }
                    var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
                    res.render("category",{movies:go,property:"category",value:req.params.cat_name,cur_page:parseInt(req.params.page),tot_page:total});
                }
            }
    });
});

//quality
app.get("/quality/:quality",function(req,res){
    res.redirect("/quality/"+req.params.quality+"/p/1");
});

app.get("/quality/:quality/p/:page",function(req,res){
    movie.aggregate([
        { "$match": { "quality":req.params.quality}},
        { "$sort" : { "added" : -1} }
        ],function(err,found){
            if(err){
                res.redirect("back");
            }else{
                var total;
                var count = found.length;
                if(count == 0){
                    res.render("noresult");
                }else {
                    if(count % 20 > 0){
                        total = Math.floor(count/20) + 1;
                    }else{
                        total = Math.floor(count/20);
                    }
                    var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
                    res.render("category",{movies:go,property:"quality",value:req.params.quality,cur_page:parseInt(req.params.page),tot_page:total});
                }
            }   
    });
});

//genre
app.get("/genre/:genre",function(req,res){
    res.redirect("/genre/"+req.params.genre+"/p/1");
});

app.get("/genre/:genre/p/:page",function(req,res){
    movie.aggregate([
        { "$match": { "genre":req.params.genre}},
        { "$sort" : { "added" : -1} }
        ],function(err,found){
            if(err){
                res.redirect("back");
            }else{
                var total;
                var count = found.length;
                if(count == 0){
                    res.render("noresult");
                }else{
                    if(count % 20 > 0){
                        total = Math.floor(count/20) + 1;
                    }else{
                        total = Math.floor(count/20);
                    }
                    var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
                    res.render("category",{movies:go,property:"genre",value:req.params.genre,cur_page:parseInt(req.params.page),tot_page:total});
                }
            }
    });
});

//size
app.get("/size/:size",function(req,res){
    res.redirect("/size/"+req.params.size+"/p/1");
});

app.get("/size/:size/p/:page",function(req,res){
    movie.aggregate([
        { "$match": { "size":{"$lt" : parseInt(req.params.size)}}},
        { "$sort" : { "added" : -1} }
        ],function(err,found){
            if(err){
                res.redirect("back");
            }else{
                var total;
                var count = found.length;
                if(count == 0){
                    res.render("noresult");
                }else{
                    if(count % 20 > 0){
                        total = Math.floor(count/20) + 1;
                    }else{
                        total = Math.floor(count/20);
                    }
                    var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
                    res.render("size",{movies:go,value:req.params.size,cur_page:parseInt(req.params.page),tot_page:total});
                }
            }        
        });
});

//year
app.get("/year/:year",function(req,res){
    res.redirect("/year/"+req.params.year+"/p/1");
});

app.get("/year/:year/p/:page",function(req,res){
    movie.aggregate([
        { "$match": { "released":{"$gte" : new Date(req.params.year),"$lte":new Date((parseInt(req.params.year)+10).toString(10))}}},
        { "$sort" : { "added" : -1} }
        ],function(err,found){
            if(err){
                res.redirect("back");
            }else{
                var total;
                var count = found.length;
                if(count == 0){
                    res.render("noresult");
                }else{
                    if(count % 20 > 0){
                        total = Math.floor(count/20) + 1;
                    }else{
                        total = Math.floor(count/20);
                    }
                    var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
                    res.render("year",{movies:go,year:req.params.year,cur_page:parseInt(req.params.page),tot_page:total});
                }
            }        
        });
});

//web-series
app.get("/web-series",function(req,res){
    res.redirect("/web-series/p/1");
});
app.get("/web-series/p/:page",function(req,res){
    movie.aggregate([
        { "$match": { "category":"Web-series"}},        
        { "$sort" : { "added" : -1} }
        ],function(err,found){
            if(err){
                res.redirect("back");
            }else{
                var total;
                var count = found.length;
                if(count == 0){
                    res.render("noresult");
                }else{
                    if(count % 20 > 0){
                        total = Math.floor(count/20) + 1;
                    }else{
                        total = Math.floor(count/20);
                    }
                    var go = found.slice(((req.params.page - 1) * 20),((req.params.page - 1) * 20) + 20);
                    res.render("webseries",{movies:go,cur_page:parseInt(req.params.page),tot_page:total});
                }
            }
    });
});

//search 
app.post("/search",function(req,res){
    var search = req.body.search;
    var arr = search.split(" ");
    movie.find({ "keyword":{"$in":arr}},function(err,found){
        if(err){
            res.redirect("/");
        }else{
            if(found.length == 0){
                res.render("noresult");
            }else{
                if(found.length > 20)
                    var go = found.slice(0,20);
                else
                    var go = found;
                res.render("index",{movies:found,cur_page:1,tot_page:1});
            }
        }
    });
});

//report
app.post("/report",function(req,res){
    report.create(req.body.report,function(err,submitted){
        if(err){
            res.send("Sorry for inconvenience but your report doesn't get submitted. Try again!");
        }else{
            res.send("Thanks! Your report will be taken into consideration before 24 hours. Have Fun!!!");
        }
    });
});

//about 
app.get("/about",function(req,res){
    res.render("about");
});

//howto
app.get("/how-to-download",function(req,res){
    res.render("howto");
});

//movie page
app.get("/:movie",function(req,res){
    movie.findOne(
        {
          'title': (req.params.movie).toString()
        },function(err,found){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("movie",{movie:found});
        }
    });
});

app.listen(3000, function(){
    console.log("server started");
});
