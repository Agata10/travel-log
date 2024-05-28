import {
  useTheme,
  Grid,
  List,
  Card,
  Box,
  CardContent,
  ListItem,
  Paper,
  Typography,
  Input,
  TextField,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useContext } from 'react';
import { ExploreContext } from '../utilis/ExploreContext';

const ariaLabel = { 'aria-label': 'description' };

const Favorites = () => {
  const theme = useTheme();
  const context = useContext(ExploreContext);
  const { places } = context;
  return (
    <Grid container mt={3} pr={2}>
      <Grid
        item
        xs={12}
        sx={{ typography: { ...theme.typography.h4 } }}
        textAlign={'center'}
      >
        Your favourites
      </Grid>
      <Grid item xs={12}>
        <List
          className="overflow-auto space-y-2"
          sx={{
            height: '80vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
          }}
        >
          {console.log(places)}
          {places.map((place) => {
            return (
              <ListItem
                key={crypto.randomUUID()}
                sx={{
                  height: { xs: '200px', sm: '150px' },
                  display: 'flex',
                  gap: 2,
                  width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' },
                }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    width: '70%',
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant={{ xs: 'body', md: 'h6' }}>
                      {place.name}
                    </Typography>
                    <Box display="flex" marginTop={1}>
                      <LocationOnOutlinedIcon fontSize="small" />
                      <Typography gutterBottom variant="body2">
                        {place.address}
                      </Typography>
                    </Box>
                    <TextField
                      placeholder="Add notes, links etc here..."
                      inputProps={ariaLabel}
                      className="overflow-y-hidden hover:overflow-y-visible"
                      sx={{ width: '70%', mt: 1, pl: 1 }}
                      multiline
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </CardContent>
                </Card>
                <Paper
                  sx={{
                    borderRadius: 3,
                    height: { xs: '130px', sm: '130px' },
                    width: '30%',
                  }}
                >
                  <img src={place.src} alt={place.name}></img>
                </Paper>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default Favorites;
