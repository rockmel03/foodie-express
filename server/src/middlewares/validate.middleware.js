import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

export const validate = (schemas) => {
  return (req, res, next) => {
    const sources = ["body", "query", "params"];
    for (const source of sources) {
      if (schemas[source]) {
        try {
          req[source] = schemas[source].parse(req[source]); // overwrite with validated data
          return next();
        } catch (error) {
          if (error instanceof ZodError) {
            const errors = error.issues.map((err) => ({
              path: err.path.join("."),
              message: err.message,
            }));

            return next(ApiError.validationError("Validation Error", errors));
          }
          return next(error);
        }
      }
    }
    next();
  };
};
