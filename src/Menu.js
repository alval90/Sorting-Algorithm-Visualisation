import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const SimpleMenu = function(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = value => {
    if (typeof value == "string") {
      props.changeAlgorithm(value);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.algorithm || "Open Menu"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose("Bubble")}>Bubble sort</MenuItem>
        <MenuItem onClick={() => handleClose("Selection")}>
          Selection sort
        </MenuItem>
        <MenuItem onClick={() => handleClose("Insertion")}>
          Insertion sort
        </MenuItem>
        <MenuItem onClick={() => handleClose("Merge")}>Merge sort</MenuItem>
        <MenuItem onClick={() => handleClose("Quicksort")}>Quicksort</MenuItem>
        <MenuItem onClick={() => handleClose("Heap")}>Heap sort</MenuItem>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
