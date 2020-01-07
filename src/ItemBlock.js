import React from "react";

const itemBlock = function(props) {
  return (
    <div
      style={{
        margin: "0px 2px",
        height: props.itemHeight,
        width: props.itemWidth,
        backgroundColor: props.blockColor
      }}
    ></div>
  );
};

export default itemBlock;
