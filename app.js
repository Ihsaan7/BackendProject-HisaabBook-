const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const Port = 8000;

// --------- MIDDLEWARE ----------
app.set("view engine", "ejs");
// Set views directory for both local and Vercel environments
const viewsPath = process.env.VERCEL ? path.join(process.cwd(), "views") : path.join(__dirname, "views");
app.set("views", viewsPath);
console.log("Views directory set to:", viewsPath);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "dh@#dSWcs^21S",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

// ------------HELPER-------------
function loadFiles() {
  const listArray = [];
  const dir = path.join(__dirname, "files");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf8"); // ✅ FIXED

    listArray.push({
      heading: file,
      content: content,
      now: new Date(parseInt(file)).toISOString().slice(0, 10), // extract date from id
      id: file,
    });
  });

  return listArray;
}

// ------------ROUTES-----------------

// slash Route /
app.get("/", (req, res, next) => {
  try {
    const listArray = loadFiles(); // refresh from disk
    res.render("index", { listArray });
  } catch (err) {
    next(err);
  }
});

// Create route /create
app.get("/create", (req, res, next) => {
  try {
    res.render("showCreate");
  } catch (err) {
    next(err);
  }
});

app.post("/create", (req, res, next) => {
  try {
    const { heading, content } = req.body;

    if (!heading || !content || heading.trim() === "" || content.trim() === "") {
      return res.status(400).send("⚠️ Heading and Content cannot be empty");
    }

    const id = Date.now().toString();

    fs.writeFile(path.join(__dirname, "files", id), content, (err) => {
      if (err) return next(err);
      console.log("Successfully Created Filename:", id);
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
});

// Show Hisaab Route
app.get("/hisaab/:id/:now", (req, res) => {
  const filePath = path.join(__dirname, "files", req.params.id);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(404).send("File not found!");
    }
    res.render("showHisaab", {
      id: req.params.id,
      now: req.params.now,
      content: data,
    });
  });
});

// Show Update Route
app.get("/edit/:id/:now", (req, res, next) => {
  console.log("⚡ /edit route hit");
  const filePath = path.join(__dirname, "files", req.params.id);

  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) return next(err);

    res.render("edit", {
      id: req.params.id,
      now: req.params.now,
      content: content,
    });
  });
});

app.post("/edit/:id", (req, res, next) => {
  const filePath = path.join(__dirname, "files", req.params.id);
  const updatedContent = req.body.fileContent;

  fs.writeFile(filePath, updatedContent, "utf8", (err) => {
    if (err) return next(err);

    console.log(`File ${req.params.id} updated successfully`);
    const now = new Date(parseInt(req.params.id)).toISOString().slice(0, 10);
    res.redirect(`/hisaab/${req.params.id}/${now}`);
  });
});

// Delete Routes
app.post("/del/:id", (req, res, next) => {
  const filePath = path.join(__dirname, "files", req.params.id);

  fs.unlink(filePath, (err) => {
    if (err) return next(err);

    console.log("Successfully deleted the file");
    res.redirect("/"); // redirect back to home after delete
  });
});

// ---------------Error handling-----------------
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

// ------------- Port ( listen ) -----------------
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
