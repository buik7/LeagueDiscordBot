import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

export function connectToDatabase() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch(console.error);
}
