import React from "react";
import Masonary from "react-masonry-css";
import Card from "./Card";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonaryLayout = ({ cards }) => {
  return (
    <Masonary
      className="flex animate-slide-fwd "
      breakpointCols={breakpointObj}
    >
      {cards?.map((item) => {
        return <Card key={item._id} data={item} className="w-max" />;
      })}
    </Masonary>
  );
};

export default MasonaryLayout;
