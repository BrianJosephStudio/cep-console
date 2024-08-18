import { Box, Typography } from "@mui/material";

export const SessionIdentifier = ({
  sessionIdentifier,
  variant
}: {
  sessionIdentifier: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sessionIdentifier);
  };
  return (
    <Box
      onClick={copyToClipboard}
      sx={{
        color: "#24ffaf",
        cursor: "pointer",
        backgroundColor: "black",
        borderRadius: "2rem",
        paddingY: "1rem",
        paddingX: "3rem",
        marginX: "auto",
      }}
    >
      <Typography variant={variant}>{sessionIdentifier}</Typography>
    </Box>
  );
};
