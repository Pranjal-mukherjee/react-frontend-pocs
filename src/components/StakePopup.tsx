import {
  Button,
  Card,
  Dialog,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
const OuterCard = styled(Dialog)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
interface StakeProps {
 
  email?: string;
  lastName?: string;
  firstName?: string;
  action: string;
  onClickAction:(e:any)=>void
  onFirstNameChange:(e:any)=>void;
  onLastNameChange:(e:any)=>void;
  onEmailChange:(e:any)=>void;
  handleClose:()=>void
}
const StakePopup = (props: StakeProps) => {
  return (
    <OuterCard open={true} onClose={props.handleClose}>
      <Typography variant="h5">{`${props.action} StakeHolder`}</Typography>
      <Divider />
      <Typography variant="h4">Basic Info</Typography>
      <Typography variant="h4">First Name</Typography>
      <TextField value={props.firstName} onChange={props.onFirstNameChange}/>
      <Typography variant="h4">Last Name</Typography>
      <TextField value={props.lastName} onChange={props.onLastNameChange}/>
      <Typography variant="h4">Email</Typography>
      <TextField value={props.email} onChange={props.onEmailChange}/>
      <Button variant="contained" onClick={props.onClickAction}>{props.action}</Button>
      <Button variant="contained">Cancel</Button>
    </OuterCard>
  );
};

export default StakePopup;
