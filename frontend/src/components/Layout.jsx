import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = ({ children }) => {
  return (
    <Box xs={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar DrawerHeader={DrawerHeader} />

      <DrawerHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
