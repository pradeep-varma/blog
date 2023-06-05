//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Welcome visitor! Thanks for stopping by.Here is something you probably want to checkout!";
const aboutContent = "The content here will be completely crazyy!! ";
const contactContent = "I'm Pradeep and you can contact me anytime";

const app = express();

mongoose.connect("mongodb+srv://admin-pradeep:Raju2108@cluster0.xn4cajf.mongodb.net/blogDB").then(
  app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  })
);

const postSchema={
  title:String,
  content:String
};

const Post=mongoose.model("post",postSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  Post.find({}).then(function(posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      }).catch(err => console.log(err));

  })
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save()
  res.redirect("/");
});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId}).then(function(post){
    res.render("post",{
      title: post.title,
      content: post.content
    });

  });

  

});


