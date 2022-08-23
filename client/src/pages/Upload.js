import { React, useState } from "react";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [ImageFile, SetImageFile] = useState();
  const [videofile, Setvideofile] = useState("");
  const [isdisabled, setdisabled] = useState(false);
  const Handleimage = (e) => {
    const file = e.target.files[0];
    const data = new FileReader();
    data.readAsDataURL(file);
    data.onloadend = () => {
      SetImageFile(data.result);
    };
  };
  const Handlevideo = (e) => {
    const file = e.target.files[0];
    const data = new FileReader();
    data.readAsDataURL(file);
    data.onloadend = () => {
      Setvideofile(data.result);
    };
  };
  const handleSubmit = async (e) => {
    setdisabled(true);
    e.preventDefault();
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: JSON.stringify({
          data: { title, description, ImageFile, videofile },
        }),
        headers: { "Content-type": "application/json" },
      });
      if (response) {
        setdisabled(false);
        alert("file Uploaded Successfully");
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          placeholder="description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <label for="image">Choose image to upload</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={Handleimage}
        />
        <label for="image">Choose video to upload</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="video/*"
          placeholder="Video upload here"
          onChange={Handlevideo}
        />
        <button className="btn" type="submit" disabled={isdisabled}>
          Submit
        </button>
      </form>
      {isdisabled && <div class="spinner"></div>}
    </>
  );
};

export default Upload;
