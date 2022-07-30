import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';

export const Wind = (props) => (
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
            Wind
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {`${props.wind} m/s`}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <AirIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
