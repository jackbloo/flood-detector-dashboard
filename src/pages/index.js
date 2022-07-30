import Head from 'next/head';
import React from 'react';
import {useState, useEffect} from 'react'
import { Box, Container, Grid } from '@mui/material';
import { Temperature } from '../components/dashboard/temperature';
import { Weather } from '../components/dashboard/weather';
import { Rainfall } from '../components/dashboard/rainfall';
import { DataCollections } from '../components/dashboard/data-collections';
import { AlertButton } from '../components/dashboard/alert-button';
import { Wind } from '../components/dashboard/wind';
import { DashboardLayout } from '../components/dashboard-layout';
import {db, onValue, ref} from '../../src/utils/firebase'

const Dashboard = () => {
  const [allData, setAllData] = useState({})
  const [latestData, setLatestData] = useState({})
  const [isSend, setIsSend] = useState(false)
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dataCountRef = ref(db, 'thesis/' + 'experiment');
    onValue(dataCountRef, (snapshot) => {
      const data = snapshot.val();
      const totalKeys = Object.keys(data)
      setLatestData({...data[totalKeys[totalKeys.length - 1]]})
      setAllData({...data})
    });
  },[])

  const predictData = () => {
    const max = (18*10.25) - (0.031 * Number(latestData.flowSensor)) + 28.62
    const current =(((25-Number(latestData.ultraSonic))*10.25) - (0.031 * Number(latestData.flowSensor)) + 28.62)
    console.log(max-current)
    if(max - current <= 60){
      console.log("masuk true")
      return true
    }else{
      return false
    }

  }

  useEffect(() => {
    if((weatherData?.rain && weatherData?.weather?.[0]?.main === "Rain") || weatherData?.weather?.[0]?.main === "Clouds"){
      if(predictData()){
        if(!isSend){
          // sendAlert()
          setIsSend(true)
        }
      }else{
        if(isSend){
          setIsSend(false)
        }
      }
    }

  },[latestData, isSend, weatherData])

const sendAlert = () => {
  fetch('http://localhost:3001/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:`Alert! Reservoir height is ${25-latestData.ultraSonic} cm with depth of ${latestData.waterLevel} V submerged and flow of ${latestData.flowSensor} L/hr, Flood will happen in 60 seconds,Please Evacuate immediately`, to: "+6287775115144"})
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log("sucesss")
      } else {
        console.log("fail")
      }
    }).catch(error => {
      console.log(error)
    });
}



const getWeather = async () => {
  try{
    setLoading(true)
    const respond = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${"-6.35"}&lon=${"106.76666666667"}&appid=${process.env.APIKEY}`)
    const respondData = await respond.json()
    setWeatherData({...respondData})
    setLoading(false)
  }catch(error){
    console.log(error)
    setLoading(false)
  }
}
useEffect(() => {
 getWeather()

}, []);

useEffect(() => {
  const myInterval = setInterval(getWeather, 60000);

  return () => {
    clearInterval(myInterval);
  };
}, []);

  if(loading){
    return(<></>)
  }

  return (
  <>
    <Head>
      <title>
        Flood Alert Dashboard
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <Weather 
            place={weatherData.name} 
            conditions={weatherData}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Temperature temperature={weatherData?.main?.temp/10}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Rainfall rain={weatherData.rain ? weatherData.rain["1h"] : 0}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Wind wind={weatherData?.wind?.speed}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <AlertButton sendAlert={sendAlert}/>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <DataCollections allData={allData} 
            weatherData={weatherData}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
