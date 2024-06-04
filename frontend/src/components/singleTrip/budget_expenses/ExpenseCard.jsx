import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Card,
  Box,
  CardContent,
  ListItem,
  IconButton,
  useTheme,
  Typography,
} from '@mui/material';
import { deleteExpense } from '../../../api/expenseAPI';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { useEffect, useState } from 'react';

const categories = [
  { name: 'Flights', icon: <FlightTakeoffIcon /> },
  { name: 'Lodging', icon: <HotelIcon /> },
  { name: 'Car rental', icon: <CarRentalIcon /> },
  { name: 'Transit', icon: <DirectionsTransitIcon /> },
  { name: 'Food', icon: <RestaurantIcon /> },
  { name: 'Sightseeing', icon: <AccountBalanceOutlinedIcon /> },
  { name: 'Other', icon: <LocalActivityOutlinedIcon /> },
];

const ExpenseCard = ({ expense, setRefresh }) => {
  const theme = useTheme();
  const [icon, setIcon] = useState(categories[6].icon);

  useEffect(() => {
    const setIconForExpense = () => {
      const foundCategory = categories.find(
        (category) => category.name === expense.category
      );
      if (foundCategory) {
        setIcon(foundCategory.icon);
      }
    };
    setIconForExpense();
  }, [expense]);

  const handleDelete = async () => {
    console.log(expense._id);
    await deleteExpense(expense._id);
    setRefresh((prev) => !prev);
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        padding: 0,
        margin: '0 auto',
        width: { xs: '100%', sm: '90%', md: '100%', lg: '80%' },
      }}
    >
      <Card
        elevation={1}
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: 1,
          mr: 2,
          padding: '5px 0',
          '&:last-child': { pb: 0 },
        }}
      >
        <Box display="flex">
          <CardContent
            sx={{
              pt: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:last-child': { pb: 1 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                width: '25%',
              }}
            >
              {icon}
              <Box>
                <Typography sx={{ fontSize: theme.typography.body1 }}>
                  {expense.description}
                </Typography>
                <Typography sx={{ fontSize: theme.typography.body2 }}>
                  {expense.category}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: theme.typography.body1 }}>
              {expense.amount}$
            </Typography>
            <IconButton
              onClick={handleDelete}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </CardContent>
        </Box>
      </Card>
    </ListItem>
  );
};

export default ExpenseCard;
