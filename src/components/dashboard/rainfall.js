import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import ShowerIcon from '@mui/icons-material/Shower';

export const Rainfall = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Rainfall
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            5 km/h
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <ShowerIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
