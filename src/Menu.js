import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";

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
        startIcon={
          <Icon className="fas fa-bars" style={{ fontSize: "16px" }} />
        }
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ width: "220px" }}
      >
        {props.algorithm || "Choose Algorithm"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose("Bubble Sort")}>
          Bubble Sort
        </MenuItem>
        <MenuItem onClick={() => handleClose("Selection Sort")}>
          Selection Sort
        </MenuItem>
        <MenuItem onClick={() => handleClose("Insertion Sort")}>
          Insertion Sort
        </MenuItem>
        <MenuItem onClick={() => handleClose("Quick Sort")}>
          Quick Sort
        </MenuItem>
        <MenuItem onClick={() => handleClose("Merge Sort")}>
          Merge sort
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
