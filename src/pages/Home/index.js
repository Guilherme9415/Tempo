import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList, View} from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import api, { key }from '../../services/api';

export default function Home(){
 const [errorMsg, setErrorMsg] = useState(null);
 const [loading, setLoading] = useState(true);
 const [weather, setWeather] = useState([]);
 const [icon, setIcon] = useState({ name:'cloud', color:'#fff'}); 
 const [background, setBackground] = useState(['#6be4ff', '#00bfea']);


  useEffect(() =>{
    (async ()=>{
      let {status} = await Location.requestPermissionsAsync();
      
      if(status !== 'granted'){
        setErrorMsg('Permissão negada para acessar sua localização.');
        setLoading(false)
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      // console.log(location.coords)`
      // weather?key=73fa27c5&lat=-23.682&lon=-46.875

      const response = await api.get(`/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
       setWeather(response.data);
      

      if(response.data.results.currently === 'noite'){
        setBackground(['#0353A4', '#001845']);
      }
       
      switch(response.data.results.condition_slug){
        case 'clear_day':
          setIcon({name: 'partly-sunny', color: '#ffb300'});
          break;

        case 'cloudly_night':
          setIcon({name: 'cloudy-night', color: '#fff'});
          break;

        case 'storm':
          setIcon({name: 'thunderstorm', color: '#fff'});
          break;

        case 'rain ':
          setIcon({name: 'rainy', color: '#fff'});
          break;
       
      }
      setLoading(false);

    })();

  },[]);
   
  if(loading){
    return(
      <View style={styles.container1}>
        <Text style={{fontSize:25, fontStyle:'italic',color:'#000'}}>Carregando...</Text>
      </View>
    )
  }

   return(
     <SafeAreaView style={styles.container}> 

      <Menu/>
      <Header background={background} weather={weather} icon={icon}/>
      <Conditions weather={weather}/>
      
      <FlatList
        horizontal={true}
        contentContainerStyle={{ paddingBottom:'5%' }}
        style={styles.list}
        data={weather.results.forecast}
        keyExtractor={item => item.date}
        renderItem={({ item }) => <Forecast data={item}/>}
      />
    
     </SafeAreaView>
   )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f5f5f5',
    paddingTop:'5%'
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f5f5f5',
    paddingTop:'5%'
  },
  list:{
    marginTop:10,
    marginLeft:10,
  }
})