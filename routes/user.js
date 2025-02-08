const {Router} = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.get("/signin", (req, res) => {
    return res.render("signin")
})

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try{
        await User.create({
            username,
            email,
            password,
        })
        return res.redirect("/user/signin")
    }catch(error){
        return res.render("signup", {
            error: "User already exists!!!"
        })
    }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie('token', token).redirect("/")
    }catch(error){
        return res.render("signin", {
            // error: "Invalid email or password"
            error: error
        })
    }
})

router.get("/logout", (req, res) => {
    return res.clearCookie("token").redirect("/user/signin")
})

router.get("/delete", async (req, res) => {
    const { _id } = req.user;
    // console.log("user id::",_id)
    const comment = await Comment.find({ createdBy: _id})
    // const createdBy = comment[0].createdBy.toString();

    console.log("deleted comment:::",comment.length)
    if (comment.length > 0) {
        const createdBy = comment[0].createdBy.toString();  // Get the createdBy from the first comment
        await Comment.deleteMany({ createdBy });  // Delete comments by this user
    }


    await User.deleteOne({ _id })
    await Blog.deleteMany({ createdBy: _id})
    // await Comment.deleteMany({ createdBy: createdBy})
// console.log(createdBy);
// console.log(_id);

    // console.log("comment:::",comment.createdBy)
    return res.clearCookie("token").redirect("/user/signup")
})


module.exports = router;