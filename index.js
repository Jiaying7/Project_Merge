
// Connect to database
const mongo = require("mongodb");
const uri = "mongodb+srv://root:root123@mycluster.wvhvzdq.mongodb.net/?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true});
let db = null;

async function initDB() {
    await client.connect();
    console.log("Connected to MongoDB successfully");
    db = client.db("member_system");
    let collection=db.collection("user");
}

initDB();

// Setup express server
const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({
    secret:"anything",
    resave:false,
    saveUninitialized:true
}));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));





//建立需要的路由
app.get("/signup", function(req, res){
    res.render("signup.ejs")
});
app.get("/login", function(req, res){
    res.render("login.ejs");
});
app.get("/member", function(req, res){
    res.render("member.ejs");
});
// Add a new route to handle account deletion
// Add a new route to handle account deletion
app.get("/delete-account", async function (req, res) {
    // Assuming you have a session and logged-in user
    const loggedInUser = req.session.member;
    if (!loggedInUser) {
        return res.redirect("/login"); // Redirect to login if user not logged in
    }

    // Retrieve the email of the logged-in user
    const userEmail = loggedInUser.email;

    try {
        // Connect to the MongoDB database
        const collection = db.collection("member");

        // Delete the account from the database based on the email
        await collection.deleteOne({ email: userEmail });

        // Clear the session and log out the user
        req.session.destroy();

        // Redirect to the homepage or any other page after successful deletion
        return res.redirect("/login");
    } catch (error) {
        // Handle any potential errors
        console.error("Error deleting account:", error);
        res.redirect("/error?msg=An error occurred while deleting the account.");
    }
});

//PLAYLIST

app.post('/playlist/add', async (req, res) => {
    const song = req.body;

    // Basic validation
    if (!song.title || !song.date || !song.duration) {
        return res.status(400).json({ message: "Missing required data" });
    }

    // Connect to the MongoDB database and access the 'playlist' collection
    const collection = db.collection("playlist");

    try {
        // Insert the new song into the 'playlist' collection
        await collection.insertOne(song);
        // Return a success message
        res.status(200).json({ message: "Song added to playlist" });
    } catch (error) {
        // Handle any potential errors
        console.error("Error adding song to playlist:", error);
        return res.status(500).json({ error: "An error occurred while adding the song to the playlist." });
    }
});

app.get('/playlist', async (req, res) => {
    // Connect to the MongoDB database and access the 'playlist' collection
    const collection = db.collection("playlist");

    try {
        // Get all songs from the 'playlist' collection
        const songs = await collection.find({}).toArray();

        // Return the songs as JSON
        res.json(songs);

    } catch (error) {
        // Handle any potential errors
        console.error("Error getting songs from playlist:", error);
        return res.status(500).json({ error: "An error occurred while getting songs from the playlist." });
    }
});





//连线到/error?msg=错误信息
app.get("/error", function(req, res){
    const msg=req.query.msg;
    res.render("error.ejs", {msg:msg});
});
//登陆会员功能的路由
app.post("/login", async function(req, res){
    const email=req.body.email;
    const password=req.body.password;
    //检查资料库中的资料
    const collection=db.collection("member");
    let result=await collection.findOne({
        $and:[
            {email:email},
            {password:password}
        ]
});
if (result===null){//没有对应的会员资料，登陆失败
    res.redirect("/error?msg=登陆失败，邮件或密码输入错误");
    return;
}
//登入成功，记录会员资料在Session中
req.session.member=result;
res.redirect("/");
});
//注册会员功能的路由
app.post("/signup", async function(req, res){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    //检查资料库中的资料
    const collection=db.collection("member");
    let result=await collection.findOne({
        email:email
    });
    if(result!==null){//Email已经存在
        res.redirect("/error?msg=Registration failed, the email already registered");
        return;
    }
    //将新的会员资料放到资料库
    result=await collection.insertOne({
        name:name, email:email, password:password
    });
    //新增成功，回到首页???
    res.redirect("/login");
});
//启动伺服器在http://localhost:3000/
app.listen(3000, function(){
    console.log("Server started");
});