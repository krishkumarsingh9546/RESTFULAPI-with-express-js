const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));



app.listen(port, () => {
    console.log(`listining to port : ${port}`);  
})

app.get("/", (req, res) => {
    res.send("Sab Shi Ha Bhai");
})



let posts=[
    {
        id: uuidv4(),
        username: "krish kumar",
        content: "i love programming"
    },
    {
        id: uuidv4(),
        username: "ajit kumar",
        content: "bhadua"
    },
    {
        id: uuidv4(),
        username: "Rahul babu",
        content: "hero"
    },
    {
        id: uuidv4(),
        username: "shyam kumar",
        content: "mast hai"
    }
];

//    show All posts
 app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})


// new post creater
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

//       new post updater
app.post("/posts", (req, res) => {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
})


//      shoe special post with the id
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("show.ejs", {post});
})

//  PATCH Requsest  for update for content

app.patch("/posts/:id",(req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    
    post.content = newContent;
    res.redirect("/posts");
    
    
    res.send('patch request working');
})

// create edit post

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("edit.ejs", {post});
})


//  Destroy the post

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
})
