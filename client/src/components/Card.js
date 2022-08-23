import React from "react";

const Card = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-body"></div>
        {/* <p>{props.description}</p> */}
        <img src={props.image} />
        <h1>{props.title}</h1>
        {/* <video src={props.video} /> */}
      </div>
    </>
  );
};

export default Card;
