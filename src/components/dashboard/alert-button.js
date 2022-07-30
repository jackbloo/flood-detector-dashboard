import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

export const AlertButton = (props) => (
  <Card {...props} 
  onClick={() => props.sendAlert()}>
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
            Alert Button
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            PRESS
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <CampaignIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
