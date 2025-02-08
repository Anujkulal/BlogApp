require("dotenv").config();
const express = require('express');
const path = require("path")
const cookieParser = require("cookie-parser")

const { mongoDBConnection } = require('./connection');
const blogRouter = require("./routes/blog")
const userRouter = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middlewares/user");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT;

// DB Connection
mongoDBConnection(process.env.MONGO_URL)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(path.resolve("./public"))); //to serve the public folder statically
app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

//middlewares
app.use(checkForAuthenticationCookie("token"))

//Routes
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    })
})
app.use("/blog", blogRouter)
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});