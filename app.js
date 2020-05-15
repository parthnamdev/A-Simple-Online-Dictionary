const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("node_modules"));

var requestedWord = "Anonymous";
var requestedMeaning = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo nec ultrices dui sapien eget. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Id interdum velit laoreet id donec ultrices. Magna etiam tempor orci eu lobortis. Viverra justo nec ultrices dui. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Morbi tincidunt augue interdum velit. Est ante in nibh mauris cursus mattis molestie a iaculis. Est lorem ipsum dolor sit amet consectetur adipiscing.";
var selectedAlgoTime = "88.88";
var reqT1 = "88.88";
var reqT2 = "88";
var reqT3 = "88";
var reqT4 = "88";
app.get("/", function(req, res){
    res.render("index");
});
app.get("/know-more", function(req, res){
    res.render("know-more");
});
app.post("/selectAlgorithm", function(req, res){
    res.render("popUp");
})
app.get("/output", function(req, res){
    res.render("output", {
        word: requestedWord,
        meaning: requestedMeaning,
        t0: selectedAlgoTime,
        t1: reqT1,
        t2: reqT2,
        t3: reqT3,
        t4: reqT4

    });
})
app.listen(3000, function(){
    console.log("server started on port 3000.");
});