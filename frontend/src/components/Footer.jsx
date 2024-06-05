import { useTheme, Box } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      className="flex justify-center w-full items-center mt-auto py-4 absolute bottom-0"
      sx={{
        fontFamily: theme.typography.fontFamily,
        fontWeight: 500,
        fontSize: theme.typography.body2,
        backgroundColor: theme.palette.primary.light,
      }}
    >
      Agata Deter &copy; Copyright 2024
    </Box>
  );
};

export default Footer;
