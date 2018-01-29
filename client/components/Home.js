import React, {Component} from 'react'
import Search from './Search';


// "Home" component is the initial page displayed by default.
//It will render "Search" component. 

export default class Home extends Component {
	render(){
		return (
      <div className = "container">
        <Search />
      </div>
    )
  }
}