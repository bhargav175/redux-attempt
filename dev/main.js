import Redux from '../src'




var MyRedux = new Redux();
var MyAction = new MyRedux.Action(function(...args){
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


var anotherreducer = MyRedux.combineReducers({
	one : function(state={},action){
		return state;
	},
	two : function(state={},action){
		return {
			val : "two"
		};
	}
});

var reducer = MyRedux.combineReducers({
	one : function(state={},action){
		return {
			val : "one"
		};
	},
	two : function(state={},action){
		return {
			val : "two"
		};
	}
});

var rootReducer = MyRedux.combineReducers({
	anotherreducer,
	reducer
});


MyRedux.createStore(rootReducer);

/**
 * Dispatch actions
 */
console.log(MyAction);

MyAction.dispatch(10,20);
var state = MyRedux.Store.getState();
console.log(state);


