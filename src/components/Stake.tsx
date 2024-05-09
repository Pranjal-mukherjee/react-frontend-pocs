import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { STAKE_DATA ,STAKE} from "./constants";
import FilterPopup from "./FilterPopup";
import StakePopup from "./StakePopup";
const OuterBox = styled(Box)({
  display: "flex",
  gap: "10px",
  flexDirection: "column",
});
const InnerBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
const StakeHolder = () => {
  const [filteredData, setFilteredData] = useState(() => {
    const savedData = localStorage.getItem("stakeData");
    return savedData ? JSON.parse(savedData) : STAKE_DATA;
  });
  const [isClicked, setIsClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [action, setAction] = useState("");
  const [id, setId] = useState(0);
  const savedData = localStorage.getItem("stakeData");
  const showAll = savedData ? JSON.parse(savedData) : STAKE_DATA;

  const handleEditStakeHolder = (id: number) => {
    

    const editData = filteredData.filter((value: any) => value.id === id);

    const nameArray=editData[0].name.split(" ");
    setFirstName(nameArray[0]);
    setLastName(nameArray[1]);
    setEmail(editData[0].email)
    setShowPopup(true);
    setAction("Edit");
  };
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    setText(inputValue);

    const newFilteredData =
      inputValue.length > 0
        ? showAll.filter((value: any) =>
            value.name.toLowerCase().includes(inputValue.toLowerCase())
          )
        : showAll;

    setFilteredData(newFilteredData);
  };

  const addPerson = () => {
    const updatedData = {
      id: filteredData.length + 1,
      name: firstName + " " + lastName,
      email: email,
    };
    setFilteredData((prev:any) => ([...prev, updatedData]));

    localStorage.setItem(
      "stakeData",
      JSON.stringify([...filteredData, updatedData])
    );
    setShowPopup(false);
  };
  const editPerson = () => {
    const editedData = filteredData.map((value:any) => {
      if (value.id === id) {
        return {
          ...value,
          name: firstName + " " + lastName,
          email: email,
        };
      }
      return value;
    });
    setFilteredData(editedData);
    localStorage.setItem("stakeData", JSON.stringify(editedData));
    setShowPopup(false);
  };
  

  return (
    <OuterBox>
      <InnerBox>
        <Typography variant="h3">All StakeHolders</Typography>
        <Button variant="outlined" onClick={() => setIsClicked(!isClicked)}>
          Add
        </Button>
      </InnerBox>
      {isClicked && (
        <FilterPopup
          addStakeHolder={() => {
            setShowPopup(true);
            setAction("Add");
            setFirstName("");
            setLastName("");
            setEmail("")
          }}
        />
      )}
      <TextField onChange={handleChange} size="small" value={text} />
      {showPopup && (
        <StakePopup
          action={action}
          onClickAction={action==="Add"?addPerson:editPerson}
          firstName={firstName}
          lastName={lastName}
          email={email}
          onFirstNameChange={(e: any) => setFirstName(e.target.value)}
          onLastNameChange={(e: any) => setLastName(e.target.value)}
          onEmailChange={(e: any) => setEmail(e.target.value)}
          handleClose={() => setShowPopup(false)}
        />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>StakeHolder</TableCell>
              <TableCell>Portfolio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((value: any) => (
              <TableRow key={value.id}>
                <TableCell size="small">{value.name}</TableCell>
                <TableCell>{value.email}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={(handleEdit) => {handleEditStakeHolder(value.id);setId(value.id)}}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OuterBox>
  );
};

export default StakeHolder;
