import React, { Component } from 'react';
//import our service

import JeopardyService from "../../JeopardyServices"
class Jeopardy extends Component {

  //set our initial state and set up our service as this.client on this component
  constructor(props){
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {
        "id": null,
        "answer": "",
        "question": "",
        "value": null,
        "airdate": "",
        "created_at": "",
        "updated_at": "",
        "category_id": null,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": null,
          "title": "",
          "created_at": "",
          "updated_at": "",
          "clues_count": null
        }
      },
      user: {
          name: "",
          score: 0
      }
    }
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  handleChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value
    this.setState({user})
}

  handleSubmit = (event) => {

    if (event.target.value === this.state.data.answer) {
        this.user.score += this.state.data.value
    }
    this.setState( (state, props) => ({
        score: state.user.score
    }))
}

  //display the results on the screen
  render() {
    return (
      <div>
          <label><strong>UserName:</strong></label>
          <input onChange={this.handleChange} type="text" name="userName"></input>
          <h4>Score: {this.state.user.score} </h4>
          <h3>Category: {this.state.data.category.title}</h3> 
          <h3>Question: {this.state.data.question}</h3>
          <h4>Point Value: {this.state.data.value}</h4>
          <label><strong>Your Answer:</strong></label>
          <input onChange={this.handleChange} type="text" name="userAnswer"></input> 
          <button type="submit">What is..?</button>
          <h4>CheatAnswer: {this.state.data.answer} </h4>
      </div>
    )
  }
}
export default Jeopardy;