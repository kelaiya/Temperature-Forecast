// This component is for users to search for their favourite gifs.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImage } from '../store';

class Search extends Component {
	constructor(props){
		super(props)
		this.state = {
			search : "",
			sortKey: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	//This function will change the state after user enters their field of interest
	handleChange(event){
		this.setState({
			search : event.target.value
		})
	}

	//This function will take the sortKey for sorting the gifs
	handleSortChange(event){
		this.setState({ sortKey: event.target.value})
	}

	//This function is for dispatching the function 
	handleSubmit(event){
		event.preventDefault()
		this.props.fetchImage(this.state.search)
	}



	render(){
		var images = this.props.images; //images is the data came from the store
		var emptyArray = [];
		var pic = emptyArray.concat(images.data);  //pic will contains all the data
		
		//Sort the images with different options
		if(this.state.sortKey == "sizeL-H"){
			pic.sort((a, b) => Number(b.images.original.size) < Number(a.images.original.size) ? 1 : -1);
		} else if(this.state.sortKey == "sizeH-L"){
			pic.sort((a, b) => Number(a.images.original.size) < Number(b.images.original.size) ? 1 : -1);
		}	else if(this.state.sortKey == "titleA-Z") {
			pic.sort((a, b) => a.title > b.title);
		} else if(this.state.sortKey == "titleZ-A") {
			pic.sort((a, b) => b.title > a.title);
		} 

		return (
		        <div className = "container">
		        	<h1 className="h1"> Wanna See The Magic??? </h1>
		        	
		        	<div>
		        		<form onSubmit={this.handleSubmit} className="data">
		        			<label className="labelName"> Enter any field     :     
		        				<input id="inputBox" type="text" onChange={this.handleChange} className="inputData" />
		        			</label>
		        			<button type="submit" className="button"> Search </button>
		        		</form>
		        	</div>
		       		
			      	<div>
				      	{
				      		images.data ? <div>
						       <div className="sort">
						       	<form onSubmit={this.handleSortSubmit} className="sortclass">
						       		<select value={this.state.value} onChange={this.handleSortChange} className="sortclass">
						       			<option> SORT </option>
						       			<option value="sizeL-H">By Size Small-Large</option>
						       			<option value="sizeH-L">By Size Large-Small</option>
						       			<option value="titleA-Z"> By Title (A-Z) </option>
						       			<option value="titleZ-A"> By Title (Z-A) </option>
						       		</select>
						       	</form>
						       </div>
				    			</div> : <h1 />
				      	}
			      	</div>

							<div className="imagesMain">
				        {
				        	images.data ? <div className = "images"> {
				        		pic.map((photo, index) => {
				        			return(
				        				<div key={index} className="singlePic">
				        					<img className = "image" src = {photo.images["original"].url} />
				        					<h3> Title : {photo.title} </h3>
				        					<h3> Photo Size : {photo.images.original.size}px </h3>
				        				</div>
				        			)
				        		})
				        	}
				        	</div> : <h1 />
								}
			      	</div>			      
			      
			      </div>
		      )
			}
}

const mapStateToProps = function(state){
	// images is the value of state in store
	return {
		images : state.images
	}

}

const mapDispatchToProps = function(dispatch) {
	return {
		fetchImage(pic){
			dispatch(fetchImage(pic));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

