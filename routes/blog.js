const {Router} = require("express")
const multer = require("multer")
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({storage})

router.get("/add-blog", (req, res) => {
    return res.render("addBlog", {
        user: req.user
    })
})

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { body, title } = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`,
    })
    return res.redirect("/")
})

router.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("createdBy")
    const comments = await Comment.find({ blogId: id}).populate("createdBy")
    return res.render("blog", {
        user: req.user,
        blog,
        comments,
    })
})

router.post("/comment/:blogId", async (req, res) => {
    const id = req.params.blogId;
    const comment = Comment.create({
        content: req.body.content,
        blogId: id,
        createdBy: req.user._id,
    })
    return res.redirect(`/blog/${id}`)
})

router.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.redirect("/")
})

router.get("/edit/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    // console.log(blog.id)
    return res.render("editBlog", {
        blog,
        user: req.user,
    })
})

router.post("/edit/:id", upload.single("coverImage"), async (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;
    const blog = await Blog.findById(id);
    blog.title = title;
    blog.body = body;
    if(req.file){
        blog.coverImage = `/uploads/${req.file.filename}`
    }   
    await blog.save();
    return res.redirect(`/blog/${id}`)
}
)

module.exports = router;