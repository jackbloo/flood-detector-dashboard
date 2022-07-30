import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export const Weather = (props) => {
    return (
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
            {props?.place || ""}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props?.conditions?.weather ? props?.conditions?.weather[0]?.main : ""}
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
            <InfoIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};
