import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { SessionIdentifier } from "./Sessionidentifier";

export const Console = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const { roomIdentifier } = useParams<{ roomIdentifier: string }>();

  const consoleContainter = useRef<HTMLElement>();

  const clearConsole = () => {
    setLogs([]);
  };

  useEffect(() => {
    const socket = io();

    socket.emit("join-room", roomIdentifier);

    socket.on("log", (text: string) => {
      setLogs((prevLogs) => [...prevLogs, text]);
    });

    socket.on("clear", () => {
      setLogs([]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!consoleContainter.current) return;

    const scrollToBottom = () => {
      const element = consoleContainter.current as HTMLElement;
      element.scrollTop = element.scrollHeight;
    };

    scrollToBottom();
  }, [logs]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        maxeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 8fr 3fr 1fr",
          backgroundColor: "black",
          // height: '3rem',
          placeContent: "center",
        }}
      >
        <Box
          component={'div'}
          title="Console Session Identifier. Click to copy."
          sx={{
            gridColumn: "2/3",
          }}
        >
          <SessionIdentifier sessionIdentifier={roomIdentifier!}/>
        </Box>
        <Typography
          sx={{ margin: "1rem", gridColumn: "3/4" }}
          variant="h5"
          fontFamily={"roboto"}
        >
          CEP Console
        </Typography>
      </Box>
      <Button
        sx={{
          width: "100%",
          "&:focus": {
            outline: "none",
          },
        }}
        onClick={clearConsole}
      >
        Clear
      </Button>
      <Box
        ref={consoleContainter}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
          overflowX: "hidden",
          textAlign: "left",
          paddingY: "1rem",
          paddingX: "2rem",
        }}
      >
        {logs.map((log) => (
          <Typography color={"white"}>{log}</Typography>
        ))}
      </Box>
    </Box>
  );
};
