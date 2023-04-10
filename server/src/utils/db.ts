import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  if (process.env.MONGODB_URI) {
    console.log("connected to", process.env.MONGODB_URI);
  }

  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
      console.log("connected to mongoDb");
    })
    .catch((err: string) => {
      console.error(err);
    });
};
