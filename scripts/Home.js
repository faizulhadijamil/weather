import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
// import { WEATHER_API_KEY } from './utils/APIKEY';
import { API_KEY } from './utils/WeatherAPIKey';
import ForecastCard from './components/ForecastCard';
//import {convertMonth, convertDay} from './utils/Converter';

// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Home',
    // };
    constructor() {
        super();
      
        this.state = {
          isLoading: true,
          date: '',
          // hardcode:- singapore latitude longitude
          latitude:1.351616,
          longitude:103.808053,
          forecast: [],
          todayForecast: null,
          fetchWeatherError:false,
          fWErrorMsg:'',
        };
    }

    componentDidMount() {
        this.fetchWeatherData();
        var date = new Date().getDate(); //Current Date
        var day = new Date().getDay(); //Current Day
        var theDay = this.convertDay(day);
        var month = new Date().getMonth() + 1; //Current Month
        var theMonth = this.convertMonth(month);
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        
        // todo: get time zone for singapore
        this.setState({date:theDay + ', ' + date + ' ' + theMonth + ' ' + year + ' ' + hours + ':' + min});
    }

    fetchWeatherData(){

		// Construct the API url to call
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude +'&units=imperial&APPID=' + API_KEY;
        // Call the API, and set the state of the weather forecast
		fetch(url)
		.then(response => response.json())
		.then(data => {
            if (data.cod === 401){
                console.log('weatherData: ', data.message);
                this.setState({
                    isLoading:false,
                    fetchWeatherError:true,
                    fWErrorMsg: data.message,
                });
            }
            // todo: to put other condition
            else{
                // console.log('weatherData: ', data);
                // var itemData = data.list.filter(item => item.dt_txt === '2019-05-05');
                // console.log('itemData: ', itemData);

                this.setState((prevState, props) => ({
                    forecast: data,
                    todayForecast: data.list[0], 
                    isLoading:false,
                }));
            }
		})
    }
    
    convertMonth = (theMonth) =>{
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return (months[theMonth-1]);
    }

    convertDay = (theDay) => {
        var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
        return (days[theDay]);
    }

    renderItem (item) {

        var {item} = item;

        return(
            <ForecastCard 
                detail={item} 
            />
        )
    }

    keyExtractor (item, index) {
        var theDate = item.dt_txt.split(' ');
        var theId = theDate[0]; 
        return (theId);
    }

    renderTheWeather() {
        const { isLoading } = this.state;

        return (
            <View style={{ flex: 1, alignItems: "center", marginTop:20}}>
                {isLoading && <ActivityIndicator size="large"/>}
                {true && !isLoading && this.state.fetchWeatherError && 
                    <Text>
                        {this.state.fWErrorMsg}
                    </Text>
                }
                {true && !isLoading && !this.state.fetchWeatherError && 
                    <View style = {{flex:1, marginHorizontal:10}}>
                        {this.renderTodayWeather()}
                        <FlatList 
                            data={this.state.forecast.list} 
                            style={{marginTop:20}} 
                            // keyExtractor={item => item.dt_text} 
                            keyExtractor={this.keyExtractor}
                            renderItem = {this.renderItem}
                        />
                    </View>
                }
                
            </View>
        );
    }
    
    renderTodayDate(){
        return(
            <Text style = {styles.HeaderText}>
                {this.state.date}
            </Text>
        )
    }

    renderTodayWeather(){
        console.log('renderTodayWeather: ', this.state.todayForecast);

        return(
            <View style = {{alignItems:'center'}}>
                <Text style = {styles.TempHeaderText}>
                    {Math.round(this.state.todayForecast.main.temp)}
                </Text>
                <Text style = {styles.TempsubHeadText}>
                    {this.state.todayForecast.weather[0].description}
                </Text>
            </View>
            
        )
    }

    render() {    
        return (
        <View style={{ flex: 1, alignItems: "center", marginTop:20}}>
            {this.renderTodayDate()}
            {this.renderTheWeather()}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    HeaderText: {
        fontSize:20,
        fontWeight:'bold'
    },
    TempHeaderText:{
        fontSize:40,
    },
    TempsubHeadText:{
        fontSize:20,
        fontWeight:'bold',
        color:'gray'
    }
});

export default HomeScreen;