import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    data: [],
    city: ''
  }

  componentDidMount() {
    
    axios.get('https://developers.zomato.com/api/v2.1/cities?q=new%20york', { 'headers': { 
      'Accept': 'application/json',
      'user-key': '4fc6a8d12cfad4fa96a78af7e0712108'
        }})
        .then(hamster => {
          this.setState({
            data: hamster.data.location_suggestions
          })

        })
        .catch(error => {
        console.log(error)
        })
  }

  handleUserInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })

  } 

  handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${this.state.city}`, { 'headers': { 
      'Accept': 'application/json',
      'user-key': '4fc6a8d12cfad4fa96a78af7e0712108'
        }})
        .then(hamster => {
          this.setState({
            data: hamster.data.location_suggestions
          })

        })
        .catch(error => {
        console.log(error)
        })

  }

  render() {
    return (
      <div className="App">
        {
          this.state.data.map((element, index) => {
            return (
              <div key={index}> 
                  {element.name}
              </div>
            )
          })
        }


        <form onSubmit={this.handleSubmit}>
          <input name="city" onChange={this.handleUserInput}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
