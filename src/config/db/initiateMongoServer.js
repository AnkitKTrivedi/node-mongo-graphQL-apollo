import mongoose from "mongoose";
// Replace this with your MONGOURI.
const MONGOURI = "use your DB URI";
//const MONGOURI = process.env.MONGOURI || "";
export const initiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default initiateMongoServer;
