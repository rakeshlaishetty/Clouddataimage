const express = require("express");
const { mongoose } = require("mongoose");
const blog = require("./models/blog");
const app = express();
const { cloudinary } = require("./utils/cloudinary");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const port = process.env.PORT || 8001;
mongoose
  .connect(
    "mongodb+srv://admin:admin@netclan-cluster.sio13z6.mongodb.net/?retryWrites=true&w=majority"
  )
  .catch((error) => handleError(error));
app.get("/api", async (req, res) => {
  const Alldata = await blog.find();
  res.json(Alldata);
});

app.get("/api/:id", async (req, res) => {
  console.log(req.params.id);
  const Alldata = await blog.findById(req.params.id);
  res.json(Alldata);
});
app.post("/upload", async (req, res) => {
  const { title, description, ImageFile, videofile } = req.body.data;
  try {
    const ImageData = req.body.data.ImageFile;
    const ImageFileResponse = await cloudinary.uploader.upload(ImageData, {
      upload_preset: "interndemo",
    });

    const Videodata = req.body.data.videofile;
    const VideoDataResponse = await cloudinary.uploader.upload(Videodata, {
      resource_type: "video",
      chunk_size: 6000000,
    });
    const Blogdata = new blog({
      title,
      description,
      image: ImageFileResponse.url,
      video: VideoDataResponse.url,
    });
    Blogdata.save((err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
      }
    });
    console.log(ImageFileResponse);
    console.log(VideoDataResponse);

    res.json({ msg: "Success" });
  } catch (e) {
    console.log(e);
  }
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`listening On localhost:8000`);
});
