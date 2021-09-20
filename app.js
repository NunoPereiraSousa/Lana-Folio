require("dotenv").config();

const express = require("express");
const errorHandler = require("errorhandler");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const logger = require("morgan");

const Prismic = require("@prismicio/client");
var PrismicDOM = require("prismic-dom");

app.use(logger("dev"));
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req: req
  });
};

const handleLinkResolver = doc => {
  if (doc.type === "projec") return `/project/${doc.uid}`;

  if (doc.type === "about") return "/about";

  // if (doc.type === "collections") return "/collections";

  return "/";
};

app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver;
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

const handleRequest = async api => {
  // const meta = await api.getSingle("meta");
  // const navigation = await api.getSingle("navigation");
  const preloader = await api.getSingle("preloader");
  const footer = await api.getSingle("footer");

  return {
    // meta,
    // navigation,
    footer,
    preloader
  };
};

app.get("/", async (req, res) => {
  const api = await initApi(req);
  const home = await api.getSingle("home");

  const defaults = await handleRequest(api);

  const { results: project } = await api.query(
    Prismic.Predicates.at("document.type", "projec"),
    {
      fetchLinks: "project.label"
    }
  );

  res.render("pages/home", {
    project,
    home,
    ...defaults
  });
});

app.get("/about", async (req, res) => {
  const api = await initApi(req);
  const about = await api.getSingle("about");
  const defaults = await handleRequest(api);

  res.render("pages/about", {
    about,
    ...defaults
  });
});

app.get("/project/:uid", async (req, res) => {
  let uid = req.params.uid;

  const api = await initApi(req);
  const defaults = await handleRequest(api);

  const project = await api.getByUID("projec", uid, {
    fetchLinks: "project.label"
  });

  res.render("pages/project", {
    project,
    ...defaults
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
