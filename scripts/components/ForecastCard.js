import React, {Component} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export default class ForecastCard extends Component {

    convertMonth = (theMonth) =>{
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return (months[theMonth-1]);
    }

    convertDay = (theDay) => {
        var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
        return (days[theDay]);
    }

	render() {

        let deviceWidth = Dimensions.get('window').width;

		// Create a new date from the passed date time
		var date = new Date(this.props.detail.dt*1000);

        var day = date.getDate();
        // console.log('day: ', day);
        var month = date.getMonth() + 1; //Current Month
        var theMonth = this.convertMonth(month);
        var year = date.getFullYear(); //Current Year
        var theDay = this.convertDay(date.getDay());

        var temp_min = Math.round(this.props.detail.main.temp_min);
        var temp_max = Math.round(this.props.detail.main.temp_max);
        var temp_Text = temp_min + ' - ' + temp_max;

        var weatherText = this.props.detail.weather[0].description;

        //console.log('forecastCardData: ', this.props);

        var dateText = day + ' ' +theMonth + ' ' + year + ', ' + theDay;
		return (
            <TouchableOpacity style = {{marginVertical:5, flex:1, flexDirection:'row', alignItems:'center', padding:10, width:deviceWidth-40, justifyContent:'space-between', borderBottomWidth: 1 / PixelRatio.get(), borderColor:'gray'}}>
                <View>
                    <Text style = {styles.dateTxt}>
                        {dateText}
                    </Text>
                    <Text style = {styles.tempText}>
                        {temp_Text}
                    </Text>
                    <Text style = {styles.weatherText}>
                        {weatherText}
                    </Text>
                </View>
                <IconFontAwesome 
                    name={'angle-right'} 
                    size={30} 
                    color={'#f4511e'} 
                />
            </TouchableOpacity>
			// <Card containerStyle={styles.card}>
            //     <Text style={styles.notes}>{this.props.location}</Text>
				
			// 	<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
			// 		<Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/w/" + this.props.detail.weather[0].icon + ".png"}} />
			// 		<Text style={styles.time}>{time}</Text>
			// 	</View>

			// 	<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
				
			// 	<View style={{flexDirection:'row', justifyContent:'space-between'}}>
			// 		<Text style={styles.notes}>{this.props.detail.weather[0].description}</Text>
			// 		<Text style={styles.notes}>{Math.round( this.props.detail.main.temp * 10) / 10 }&#8451;</Text>
			// 	</View>
			// </Card>
		);
	}
}

const styles = StyleSheet.create({
    dateTxt:{
        fontSize:15,
        fontWeight:'bold'
    }, 
    tempText:{
        fontSize:13,
        marginTop:5
    }, 
    weatherText:{
        fontSize:13,
        marginTop:5,
        color:'gray'
    },
    card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
        borderRadius:20,
        height:100,
	},
	time:{
		fontSize:38,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff',
		textTransform:'capitalize'
	}
});