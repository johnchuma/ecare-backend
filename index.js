const express = require("express");
const app = express();
const AuthRoutes = require("./modules/authentication/auth.routes");
// const fileUpload = require("express-fileupload");
const PostRoutes = require("./modules/posts/post.routes");
const PostCategoryRoutes = require("./modules/post_category/post_category.routes");
const ArticleCategoryRoutes = require("./modules/article_category/article_category.routes");
const ArticleRoutes = require("./modules/articles/article.routes");
const ProductCategoryRoutes = require("./modules/product_category/product_category.routes");
const ProductRoutes = require("./modules/product/product.routes");
const TimetableRoutes = require("./modules/timetable/timetable.routes");
const PackageRoutes = require("./modules/package/package.routes");
const ProfessionRoutes = require("./modules/proffesion/profession.routes");
const FamilyRoutes = require("./modules/family/family.routes");
const AppointmentRoutes = require("./modules/appointments/appointment.routes");
const FileRoutes = require("./modules/files/files.routes");
const FollowerRoutes = require("./modules/follower/follower.routes");

const bodyParser = require("body-parser");
const { unfollowUser } = require("./modules/follower/follower.controller");
app.use(express.json());
app.use(express.static("files"));
// app.use(fileUpload());
app.use(bodyParser.text({ type: "/" }));
app.use("/products", ProductRoutes);
app.use("/auth", AuthRoutes);
app.use("/post", PostRoutes);
app.use("/postCategory", PostCategoryRoutes);
app.use("/articleCategory", ArticleCategoryRoutes);
app.use("/article", ArticleRoutes);
app.use("/productCategory", ProductCategoryRoutes);
app.use("/timetable", TimetableRoutes);
app.use("/package", PackageRoutes);
app.use("/profession", ProfessionRoutes);
app.use("/family", FamilyRoutes);
app.use("/appointment", AppointmentRoutes);
app.use("/file", FileRoutes);
app.use("/follower", FollowerRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
