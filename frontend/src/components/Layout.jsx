import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Footer from './Footer';

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
    <Box display={'flex'} flexDirection={'column'}>
      <CssBaseline />
      <Navbar DrawerHeader={DrawerHeader} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 2,
          width: '100%',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
