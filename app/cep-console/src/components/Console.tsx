import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

export const Console = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const { roomIdentifier } = useParams<{ roomIdentifier: string }>();

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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        paddingY: '1rem',
        paddingX: '2rem'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
          textAlign: 'left'
        }}
      >
        {logs.map((log) => (
          <Typography color={"white"}>{log}</Typography>
        ))}
      </Box>
    </Box>
  );
};
