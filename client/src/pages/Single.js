import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";

const Single = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch("/api/" + id, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((mine) => {
        setdata(mine);
      });
  }, []);
  const [data, setdata] = useState({});

  return (
    <>
      <div className="SinglPost">
        <div className="metadata">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
        <div className="media">
          <img src={data.image} />
          <video
            autoplay="autoplay"
            controls="true"
            loop="true"
            muted
            defaultmuted
            playsinline
            src={data.video}
            width="250px"
            height="250px"
          ></video>
        </div>
      </div>
    </>
  );
};

export default Single;
