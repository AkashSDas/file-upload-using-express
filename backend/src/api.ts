import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

// Setup cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// App
export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// If the useTempFiles & tempFileDir doesn't work then you've to use
// readDataURL for file in frontend. Packages like multer, formidable, etc...
// hides these complexities
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Routes

app.get("/dump-data", (req, res) => {
  // When data is sent from URL in the form then data will be in req.query - this happens mainly in templating engines
  // When data is send in body then data will be in req.body - this happens in postman, react, angular, etc...
  console.log(req.body);
  console.log(req.query);

  // Always design backend in such a way data should travel from req.body and not in req.query
  // Always handle images in POST request's body (same for all)

  res.send({
    body: req.body,
    query: req.query,
  });
});

app.post("/dump-data-post", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  //   let file = req.files.sampleFile as fileUpload.UploadedFile;
  //   const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
  //     folder: "file-upload-using-express",
  //   });
  //   console.log(result);

  let results = [];
  const files = req.files.sampleFile as fileUpload.UploadedFile[];
  for (let i = 0; i < files.length; i++) {
    const result = await cloudinary.v2.uploader.upload(files[i].tempFilePath, {
      folder: "file-upload-using-express",
    });
    results.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });
  }
  console.log(results);

  res.send({
    body: req.body,
    results,
  });
});
