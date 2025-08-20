import { ALLOWED_ORIGINS } from "../constants.js";

export default {
  origin: (origin, callback) => {
    if (
      ALLOWED_ORIGINS.includes(origin) ||
      (process.env.NODE_ENV === "development" && !origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
