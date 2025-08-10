import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import catwayRoutes from "./routes/catwayRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Sécurité & utilitaires
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// Session (stockée en base)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      secure: false, // true seulement si HTTPS
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2, // 2h
    },
  })
);

// Rendre l'utilisateur dispo dans toutes les vues EJS (avant les routes)
app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  next();
});

// EJS & statiques
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Swagger
const openapi = YAML.load(path.join(__dirname, "src", "docs", "openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Pages EJS
app.get("/", (req, res) => {
  res.render("home", { error: null });
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("dashboard");
});

// Routes API / app
app.use("/", authRoutes);
app.use("/catways", catwayRoutes);
app.use("/catways", reservationRoutes); // sous-ressource
app.use("/users", userRoutes);

export default app;
