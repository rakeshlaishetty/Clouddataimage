import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
const Cards = () => {
  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((mine) => {
        console.log(mine);
        setdata(mine);
      });
  }, []);
  const [data, setdata] = useState([]);
  if (data) {
    return <h3>No Data Available please upload</h3>;
  }
  return (
    <>
      <div className="containes">
        {data &&
          data.map((data, index) => {
            return (
              <>
                <div className="header">
                  <Link to={"/post/" + data._id}>
                    <Card
                      title={data.title}
                      description={data.description}
                      image={data.image}
                      video={data.video}
                      key={data._id}
                    />
                  </Link>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Cards;
