import { Box, Button, Input, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SessionIdentifier } from "./Sessionidentifier";

export const StartSession = () => {
  const [randomSessionIdentifier, setRandomSessionidentifier] =
    useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");
  const [savedSessions, setSavedSessions] = useState<
    { name: string; identifier: string }[]
  >([]);

  const navigate = useNavigate();

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const getCookie = (name: string) => {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(";");
    for (let cookie of cookiesArray) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
  };

  const saveSession = () => {
    const sessionData = {
      name: sessionName,
      identifier: randomSessionIdentifier,
    };
    const existingSessions = JSON.parse(getCookie("savedSessions") || "[]");
    const updatedSessions = [...existingSessions, sessionData];
    setCookie("savedSessions", JSON.stringify(updatedSessions), 365); // Save for 1 year
  };

  const startSession = () => {
    saveSession();
    navigate(`/${randomSessionIdentifier}`);
  };

  const startSavedSession = (sessionidentifier: string) => {
    navigate(`/${sessionidentifier}`);
  };

  useEffect(() => {
    const newRandomId = uuid();
    setRandomSessionidentifier(newRandomId);

    const existingSessions = JSON.parse(getCookie("savedSessions") || "[]");
    setSavedSessions(existingSessions);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "1rem",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          height: "100vh",
          // width: "100vw",
          gap: "1rem",
        }}
      >
        <Typography variant="h4">Start New Session</Typography>

        <Typography color={"#38a5ff"}>Session Name</Typography>
        <Input
          placeholder="Name your session"
          disableUnderline
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          sx={{
            color: "white",
            fontSize: "1.2rem",
            textAlign: "center",
            backgroundColor: "black",
            marginX: "auto",
            borderRadius: "2rem",
            width: "34rem",
            paddingY: "1rem",
            paddingX: "3rem",
          }}
        />
        <Typography color={"#38a5ff"}>Session Identifier</Typography>
        <Typography variant="subtitle1">
          Use this code to send logs remotely using our sdk. Click to copy.
        </Typography>
        <SessionIdentifier
          sessionIdentifier={randomSessionIdentifier}
          variant={"h5"}
        />
        <Button
          onClick={startSession}
          variant="contained"
          sx={{
            marginX: "auto",
            borderRadius: "2rem",
            "&.Mui-disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Background color for disabled state
              color: "rgba(255, 255, 255, 0.5)", // Text color for disabled state
              borderColor: "rgba(255, 255, 255, 0.3)", // Border color for disabled state
            },
          }}
          size="large"
          // disabled={!sessionName}
        >
          Start Session
        </Button>
      </Box>

      {savedSessions.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
          }}
        >
          <Typography variant="h4" sx={{ marginTop: "2rem" }}>
            Saved Sessions
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "22rem",
              gap: "1rem",
              width: "100%",
            }}
          >
            {savedSessions.map((session, index) => (
              <Box
                onClick={() => startSavedSession(session.identifier)}
                component={"div"}
                key={index}
                sx={{
                  display: "grid",
                  width: "34rem",
                  gridTemplateColumns: "2fr 12fr 2fr",
                  placeContent: "center",
                  height: "3rem",
                  backgroundColor: "black",
                  borderRadius: "3rem",
                  padding: "1rem",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#38a5ff",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gridColumn: "2/3",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {session.name}
                  </Typography>
                  <Typography
                    key={index}
                    sx={{ color: "#24ffaf", fontSize: "0.8rem" }}
                  >
                    {session.identifier}
                  </Typography>
                </Box>
                <DeleteIcon
                  sx={{
                    "&:hover": {
                      fill: "#ff3860",
                    },
                  }}
                ></DeleteIcon>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
