import { Button, Card, Typography, styled } from "@mui/material";
import React from "react";
const OuterCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});
interface FilterProps {
    addStakeHolder: () =>void
}
const FilterPopup = (props:FilterProps) => {
  return (
    <OuterCard>
      <Button variant="text" onClick={props.addStakeHolder}>Add StakeHolder</Button>
      <Typography variant="h6">Update StakeHolder</Typography>
    </OuterCard>
  );
};

export default FilterPopup;
