//import main from "./backend/main.js";
const main = require("./backend/main");

main.connectMongoDb();

// const uploadPDFhelper = async (fileInput) => {
//   await convertToImagesAndSave(fileInput);
// }