import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import { SeverityPill } from '../severity-pill';
const checkColor = (el, weatherData) => {
  if(weatherData.rain && weatherData.weather.main === "Rain"){
    if(Number(el.ultraSonic) < 8 || Number(el.waterLevel) > 400){
      return "error"
    }else if(Number(el.ultraSonic) >= 8 && Number(el.ultraSonic) <= 15  && Number(el.waterLevel) <= 400 && Number(el.waterLevel) >= 200)
    {
      return "warning"
    }
    else{
        return "success"
      }
  }else{
    if(Number(el.ultraSonic) < 8 || Number(el.waterLevel) > 400){
      return "error"
    }else if(Number(el.ultraSonic) >= 8 && Number(el.ultraSonic) <= 15  && Number(el.waterLevel) <= 400 && Number(el.waterLevel) >= 200)
  {
    return "warning"
  }
  else{
      return "success"
    }

}
}

const checkText = (el, weatherData) => {
  if(weatherData.rain && weatherData.weather.main === "Rain"){
    if(Number(el.ultraSonic) < 8 || Number(el.waterLevel) > 400){
      return "Danger"
    }else if(Number(el.ultraSonic) >= 8 && Number(el.ultraSonic) <= 15  && Number(el.waterLevel) <= 400 && Number(el.waterLevel) >= 200)
    {
      return "Warning"
    }
    else{
        return "Normal"
      }
  }else{
    if(Number(el.ultraSonic) < 8 || Number(el.waterLevel) > 400){
      return "Danger"
    }else if(Number(el.ultraSonic) >= 8 && Number(el.ultraSonic) <= 15  && Number(el.waterLevel) <= 400 && Number(el.waterLevel) >= 200)
  {
    return "Warning"
  }
  else{
      return "Normal"
    }
}
}


export const DataCollections = (props) => {
  return(
  <Card {...props}>
    <CardHeader title="Realtime Data" />
      <TableContainer sx={{ minWidth: 800, maxHeight: 250}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                Time
              </TableCell>
              <TableCell>
              Water level
              </TableCell>
              <TableCell >
                Water flow
              </TableCell>
              <TableCell>
              Water depth
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(props.allData).map((el, i) => {
              const name = Object.keys(props.allData[el])[0]
              const a = new Date(props.allData[el][name])
              const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              const year = a.getFullYear();
              const month = months[a.getMonth()];
              const date = a.getDate();
              const hour = a.getHours();
              const min = a.getMinutes();
              const sec = a.getSeconds();
              const time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
              return(
              <TableRow
                hover
                key={el}
              >
                <TableCell>
                  {time}
                </TableCell>
                <TableCell>
                {props.allData[el].ultraSonic}
                </TableCell>
                <TableCell>
                  {props.allData[el].flowSensor}
                </TableCell>
                <TableCell>
                {props.allData[el].waterLevel}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={checkColor(props.allData[el], props.weatherData)}
                  >
                    {checkText(props.allData[el], props.weatherData)}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
    </Box>
  </Card>
)};
