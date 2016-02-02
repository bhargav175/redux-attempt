import React from 'react';
import ReactDOM from 'react-dom';
import Reduxer from '../src'
/*
 * Root Dev Component
*/
class Main extends React.Component{
	render(){
		return <div>Main</div>;
	}
}

export default Main;

var MyReduxer = new Reduxer();
var MyAction = new MyReduxer.Action(function(...args){
	return function(dispatch){
		dispatch({
			action : 'yo',
			item : args
		});
		dispatch({
			action:'yoyo',
			item : args
		});
	}
});


var threereducer = MyReduxer.combineReducers({
	oneReducer : function(state={},action){
		console.log(state);
		return state;
	},
	twoReducer : function(state={},action){
		console.log(state);
		return {
			val : "two"
		};
	}
});

var reducer = MyReduxer.combineReducers({
	oneReducer : function(state={},action){
		console.log(state);
		return {
			val : "one"
		};
	},
	twoReducer : function(state={},action){
		console.log(state);
		return {
			val : "two"
		};
	}
});

var rootReducer = MyReduxer.combineReducers({
	threereducer,
	reducer
});


MyReduxer.createStore(rootReducer);

/**
 * Dispatch actions
 */
console.log(MyAction);

MyAction.dispatch(10,20);

ReactDOM.render(<Main/>,document.getElementById('app'));