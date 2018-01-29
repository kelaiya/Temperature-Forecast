// This component is for users to search weather of any place by entering the zipcode.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Weather from './Weather';
import { ClipLoader } from 'react-spinners'

//"search" will be the zipcode which user will enter. Its an empty string initially.
export default class Search extends Component {
	constructor(){
		super()
		this.state = {
			search : "",
			loading: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	//This function will change the state as user enters the zipcode.
	handleChange(event){
		event.preventDefault()
		this.setState({
			search : event.target.value
		})
	}
	
	//This function is for fetching data from OpenWeatherMap API. 
	//If the zipcode entered is wrong, an alert will be shown saying the zipcode is invalid. 
	handleSubmit(event){
		event.preventDefault()
		this.setState({loading: true})
		axios.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.search}&units=imperial&APPID=0e45f13530634319edacbe0fb135f6f0`)
      .then(res => res.data)
      .then(search => this.setState({ search: search, loading: false }))
     	.catch(error => {
        alert("Enter a valid zipcode")
      });
     
	}

	//When user will click on submit button, a loading spinner will appear till the weather details comes.
	render(){
		return (
		        <div>
		        	<div className="screen first">
		        		<h1 className="h1"> Weather app </h1>
		        		<h3 className="h3"> Type in your zip code to see how aweful the weather is in your area this week </h3>
		        		<form onSubmit={this.handleSubmit} className="data">     
		        			<input id="inputBox" type="text" onChange={this.handleChange} placeholder="00000"/>
		        			<ClipLoader color={'#123abc'} loading={this.state.loading} />
		        			<button type="submit" className="button"> Search </button>
		        		</form>
		        	</div>

							<Weather search={this.state.search} />	      
			      
			      </div>
		      )
		}
}