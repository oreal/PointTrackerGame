import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

// class variables
const maxPlayerCount = 4; 
var chosenPlayerCount = 2;
var gameLaunched = false;

function updateState(gameCreated){
    this.setState({gameCreated})
}

//player component
class Player extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {name: "", points : 0, saved: false, valid: false,
		gameCreated: false, isEmpty: true, startState: true};
		updateState = updateState.bind(this)
	  }
	  
	   componentWillReceiveProps(props) {
		this.setState({ gameCreated: props.gameCreated })
        }
	   AddPoints(amount) 
	  {
		this.setState({
		points : this.state.points + amount
		})
	  }

	  setName(newname) 
	  {
		this.setState({
			name : newname
		})
	  }

	  handleChange = (event) => 
	  {
		this.setState({isEmpty: event.target.value === ""});
		this.setState({valid: event.target.value.match(/^[_A-z0-9 ]*((-|\s)*[_A-z0-9 ])*$/)});
		this.setState({name: event.target.value});
		this.setState({startState: false});
	  }

	  modifyPlayer = (event) => 
	  {
		  this.setState({saved: false});
	  }

	  submitForm = (event) =>
	  {
		  event.preventDefault();
		  this.setState({saved: true});
	  }

	  render() {
	 if(this.state.startState)
	  {
		  return (
		  <form className="playerStats" onSubmit={this.submitForm}>
		  <label>Player name
		  <input type="text" value={this.state.name} onChange={this.handleChange} className="playerName"></input>
		  </label>
         </form>);
	  }
	  else if(this.state.isEmpty)
	  {
		  return (
		  <form className="playerStats" onSubmit={this.submitForm}>
		  <label>Player name
		  <input type="text" value={this.state.name} onChange={this.handleChange} className="playerName"></input>
		  </label>
		  <button className="btn btn-danger savePlayerCount" title="Name can not be empty">Empty name!</button>
         </form>);
	  }
	 else if(!this.state.valid)
	  {
		  return (
		  <form className="playerStats" onSubmit={this.submitForm}>
		  <label>Player name
		  <input type="text" value={this.state.name} onChange={this.handleChange} className="playerName"></input>
		  </label>
		  <button className="btn btn-danger savePlayerCount" title="Please do not use any special characters">Invalid value!</button>
         </form>);
	  }
	else if(!gameLaunched) {
	  return(
	  <form className="playerStats" onSubmit={this.submitForm}>
		  <label>Player name
		  <input type="text" value={this.state.name} onChange={this.handleChange} className="playerName"></input>
		  </label>
		 </form>);
		 
   }
	  else if(gameLaunched){
      return (
      <div className="playerStats">
        <h3>{this.state.name}</h3>
		<label>{this.state.points} points</label> 
		<button onClick={() => this.AddPoints(1)} className="btn btn-success">+1 point</button>
		<button onClick={() => this.AddPoints(-1)}className="btn btn-danger">-1 point</button>
	  </div>
	  );
	  }
  }
}

//player component
class GameBoard extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {gameCreated: false, validBoard: false, numberOfPlayers: 2};
		this.updatevalidBoard = this.updatevalidBoard.bind(this);
	  }

   updatevalidBoard(value) {
    this.setState({
      validBoard: value
    })
  }
	  startGame() {
		  this.setState({gameCreated: true});
		  gameLaunched = true;
		  updateState(true);
	  }

	  exitGame() {
		  this.setState({gameCreated: false});
		  gameLaunched = false;
		  window.location.reload(false);	 
	  }
      
	  render() {
		if(!this.state.gameCreated){
		return (
		<div id="newGame" className="text-center">
		<label id="playerCount">Choose the number of players</label>
		<PlayerButtons elements= {maxPlayerCount}/>
		<SetPlayerinfo />
		<button type="button" className="btn btn-secondary btn-lg createNewGameButton" onClick={() => this.startGame()}>Create game</button>	
		</div>
		  );
		}
	   else 
	   {
		return(		
		<div id="newGame" className="">
		<label id="playerCount">Set points for each player</label>
		<PlayerButtons elements= {maxPlayerCount}/>		
		<SetPlayerinfo />	
		<button type="button" className="btn btn-secondary btn-lg" onClick={() => this.exitGame()}>Exit game</button>	
		</div>
		);
	   }
	}
}

// player count selection
function PlayerButtons(props)
{
  if(gameLaunched){return null};
  const element = props.elements;
  const newButtons = [];
  for (let i = 2; i <= element; i++) {
    newButtons.push(<PlayerAmountButton key={i} amount={i} />);
  }
  return <div className="btn-group btn-group-toggle" data-toggle="buttons">{newButtons}</div>;
}

function PlayerAmountButton(props) {
	 return (
	 <button type="button" className="btn btn-secondary btn-lg" value={props.amount} 
	 onClick={() => ChoosePlayerAmount(props.amount)}>{props.amount}</button>
	 );
}

function ChoosePlayerAmount(props){
   chosenPlayerCount = props;
   ReactDOM.render(<GameBoard />, document.getElementById("gameBoardInfo"));
}


//top bar
const logoText = 'PointCalculator Game';
const header = <div className="navbar navbar-dark bg-dark">
				<h1 className="text-light">{logoText}</h1>
				</div>;


function SetPlayerinfo() {
 let playerInputFields = [];
 for (let index = 0; index < chosenPlayerCount; index++) {
 	playerInputFields.push(
	<Player key={index}/>
	);
 }
 return <div>{playerInputFields}</div>;
}

//footer
const footer = <div className="navbar navbar-dark bg-dark"></div>;

const App = () =>  [
	    <div key="0">{header}</div>,
		<div key="1" id="gameBoardInfo"><GameBoard /></div>,
		<div key="2">{footer}</div>
];
ReactDOM.render(<App />, document.getElementById('root'));
