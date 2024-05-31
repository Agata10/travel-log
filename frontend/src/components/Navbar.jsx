import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box, Icon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import icon from '../assets/images/globe.png';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Navbar = ({ DrawerHeader }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        open={open}
        elevation={1}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          <IconButton
            color={theme.palette.primary.dark}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: theme.palette.primary.dark,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Icon sx={{ fontSize: 48 }}>
            <img src={icon} alt="Logo" />
          </Icon>
          <Typography variant="h6" noWrap component="div">
            TravelLog
          </Typography>
          <Box
            sx={{
              display: {
                // xs: 'none',
                // sm: 'block',
                position: 'absolute',
                right: '2rem',
              },
            }}
          >
            <Button
              sx={{
                color: theme.palette.dark,
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                },
              }}
              component={Link}
              to="/login"
            >
              Log In
            </Button>
            <Button
              sx={{
                color: theme.palette.dark,
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  color: 'white',
                },
              }}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
            {false && (
              <Button
                sx={{
                  color: theme.palette.dark,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: 'white',
                  },
                }}
                component={Link}
                to="/logout"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: theme.palette.primary.dark }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            component={Link}
            to="/"
          >
            <ListItemButton sx={{ px: 2.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.dark,
                }}
              >
                <HomeIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary={'Home'}
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            component={Link}
            to="/explore"
          >
            <ListItemButton sx={{ px: 2.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.dark,
                }}
              >
                <TravelExploreIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary={'Explore'}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            component={Link}
            to="/trips"
          >
            <ListItemButton sx={{ px: 2.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.dark,
                }}
              >
                <ConnectingAirportsIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary={'Your trips'}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            component={Link}
            to="/favorites"
          >
            <ListItemButton sx={{ px: 2.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.dark,
                }}
              >
                <FavoriteIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText
                primary={'Your favorites'}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        {false && <Divider />}
        {false && (
          <List>
            <ListItem
              disablePadding
              sx={{ display: 'block' }}
              component={Link}
              to="/profile"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: theme.palette.primary.dark,
                  }}
                >
                  <ManageAccountsIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  primary={'Account'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: 'block' }}
              component={Link}
              to="/logout"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: theme.palette.primary.dark,
                  }}
                >
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  primary={'Log out'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Drawer>
    </>
  );
};

export default Navbar;
