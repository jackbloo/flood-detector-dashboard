import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';

export const Temperature = (props) => (
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
            Temperature
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
          {`${Math.floor(props.temperature)} C`}
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
            <ThermostatIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
