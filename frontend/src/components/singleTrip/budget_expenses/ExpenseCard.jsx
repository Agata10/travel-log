import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState, useRef } from 'react';
import {
  Card,
  Box,
  CardContent,
  ListItem,
  Paper,
  IconButton,
  TextField,
  useTheme,
  Typography,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { deleteExpense } from '../../../api/expenseAPI';

const ExpenseCard = ({ expense, setLoad }) => {
  const theme = useTheme();

  const handleDelete = async () => {
    console.log(expense._id);
    await deleteExpense(expense._id);
    setLoad((prev) => !prev);
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
              justifyContent: 'space-around',
              '&:last-child': { pb: 1 },
            }}
          >
            <Box sx={{ width: '30%', boder: '1px solid black' }}>
              <Typography sx={{ fontSize: theme.typography.body1 }}>
                {expense.description}
              </Typography>
              <Typography sx={{ fontSize: theme.typography.body2 }}>
                {expense.category}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: theme.typography.body1 }}>
              {expense.amount}$
            </Typography>
            <Button onClick={handleDelete}>Delete</Button>
          </CardContent>
        </Box>
      </Card>
    </ListItem>
  );
};

export default ExpenseCard;
