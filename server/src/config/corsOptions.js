const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",") || [];

export default {
  origin: (origin, callback) => {
    console.log(origin)
    if (
      allowedOrigins.includes(origin) ||
      (process.env.NODE_ENV === "development" && !origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
