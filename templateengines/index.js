import express from "express";

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("homepage", { title: "Homepage | EverydayKarma" });
});

app.get("/services", (req, res) => {
  res.render("services", {
    title: "Our Services | Title",
    serviceList: [
      "Web Designing",
      "SEO",
      "Digital Marketing",
      "App Development",
    ],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us TItle",
  });
});

app.use((req, res) => {
  res.send("<b>Page Not Found</b>");
});

app.listen(8000, () => {
  console.log("server has started");
});
