import { Box, Button, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SessionIdentifier } from "./Sessionidentifier";

export const StartSession = () => {
  const [randomSessionIdentifier, setRandomSessionidentifier] =
    useState<string>("");

  const navigate = useNavigate();

  const startSession = () => {
    navigate(`/${randomSessionIdentifier}`);
  };

  useEffect(() => {
    const newRandomId = uuid();
    setRandomSessionidentifier(newRandomId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "1rem",
      }}
    >
      <Typography variant="h4">Start New Session</Typography>

      <Typography color={'#38a5ff'}>Session Name</Typography>
      <Input
      placeholder="Name your session"
      disableUnderline
      sx={{
        color: 'white',
        fontSize: '1.2rem',
        textJustify: 'center',
        backgroundColor: "black",
        marginX: 'auto',
        borderRadius: "2rem",
        width: '34rem',
        
        paddingY: "1rem",
        paddingX: "3rem",
    }}></Input>
      <Typography color={'#38a5ff'}>Session Identifier</Typography>
      
      <Typography variant="subtitle1">
        Use this code to send logs remotely using our sdk. Click to copy.
      </Typography>
      <SessionIdentifier
      sessionIdentifier={randomSessionIdentifier}
      variant={'h5'}
      />
      <Button
        onClick={startSession}
        variant="outlined"
        sx={{ marginX: "auto", borderRadius: '2rem' }}
        size="large"
      >
        Start Session
      </Button>
    </Box>
  );
};
