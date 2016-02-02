const Reduxer = (function(){


	let _dispatch = function(obj){
		console.log(obj);
		_store.hit(obj);
	};

	let _store = {
		_state : {},
		rootReducer : undefined,
		hit : function(obj){
			this._state = this.rootReducer(this._state,obj);
			console.log(this._state);
		}
	} ;

	/**
	 * Dispatch function
	 */
	let _evaluateDispatch = function(obj){
		if(typeof obj !== 'function'){
			_dispatchQueue.push(obj);
		}else{
			obj.call(null,_evaluateDispatch);
		}
	}
	/**
	 * Dispatch Queue
	 * @type {Array}
	 */
	let _dispatchQueue = [];

	/**
	 * Middleware Queue
	 * @type {Array}
	 */
	let _middlewares = [];

	/**
	 * Reducers
	 * @type {Array}
	 */
	let _reducers = [];

	let _dispatchLoop = function(){
		/**
		 * If there are events to be dispatched in the queue
		 * dispatch them
		 */
		while(_dispatchQueue.length){
			_dispatch(_dispatchQueue.shift());
		}
	};





	return function(){
		
		/**
		 * Action Prototype
		 */
		var self = this;
		this.Action = function(fn){
			/**
			 * Di
			 * @return {[type]} [description]
			 */
		 	if(this === self){
		 		return ;
		 	}
		 	this.dispatch = function(...args){
				_evaluateDispatch(fn.apply(null,args));
			}
			
		};

		/**
		 * Prototype for Reducer
		 */
		this.Reducer = function(){};

		
		this.Store = function(){
			return _store;
		};

		/**
		 * Root Reducer
		 */
		this.createStore = function(rootReducer){
			_store.rootReducer = rootReducer;
		}


		/**
		 * Combine Reducers
		 */
		this.combineReducers = function(reducers){
			return function(state={},action){
				Object.keys(reducers).forEach(r=>{
					state[r] = {};
					state[r] = reducers[r](state[r],action);
				});
				return state;
			}
		};


		/**
		 * Apply middlewares
		 */
		this.applyMiddlewares = function(...fns){};

		

		setInterval(()=>{
			_dispatchLoop();
		});
	}
	
})();


export default Reduxer;