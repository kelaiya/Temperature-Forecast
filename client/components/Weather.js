// This component will give 5-day weather.
//It will take result from "Search" component using props.
import React from 'react';
const Weather = (props) => {
	
	//API result doesn't have the data regarding the day. 
	//"days" function will find day from the date which is given by API.
	//The weather showed will be of 12:00 pm everyday.
	const days = (i, date) => {
		if ((i % 8) - 3 == 0){
			var d = new Date(date);
			var n = d.getDay()
			var m = "";
			var obj = {0: "Sunday",
								 1: "Monday",
								 2: "Tuesday",
								 3: "Wednesday",
								 4: "Thursday",
								 5: "Friday",
								 6: "Saturday"
								}
			return obj[n];
		} 
	}

	return (
		  <div>
		    <div className="screen sec">
				  {
				    props.search["list"] ? <div className = "box"> {
				      props.search["list"].map((info, index) => {
				        if((index % 8) - 3 == 0){
									var day = days(index, info["dt_txt"])
					        return(
					        	<div key={index} className="singleBox">
					        		<div className="data1">
						        		<h3  className="small"> { day } </h3>
						        		<div className="data2">
						        			<div>
							        			<span id="large">{info["main"]["temp"]}</span>
							        			<span className="small"> F </span>
							        		</div>
					        			</div>
					        		</div>
					        	</div>
									)
					      } 
				     	})
				  	}
				 		</div>  : <h1> </h1>
					}
			  </div>			      
			</div>
	)
}

export default Weather;