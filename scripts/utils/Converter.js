'use strict'
function convertMonth (theMonth) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (months[theMonth-1]);
}

function convertDay (theDay){
    var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return (days[theDay]);
}

export default {convertMonth, convertDay};