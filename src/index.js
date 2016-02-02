const Redux = (function(){


	let _dispatch = function(obj){
		_store.hit(obj);
	};

	let _store = {
		_state : {},
		rootReducer : undefined,
		hit : function(obj){
			this._state = this.rootReducer(this._state,obj);
		}
	} ;

	/**
	 * Dispatch function
	 */
	let _evaluateDispatch = function(obj){
		if(typeof obj !== 'function'){
			_dispatch(obj);
		}else{
			obj.call(null,_evaluateDispatch);
		}
	}


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

		
		this.Store = {
				getState : function(){
					return _store._state;
				}
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

		/**
		 * Connect
		 */
		
		this.connect = function(container){
			//container is a react element
			console.log(container);
		}
		
	}
	
})();


export default Redux;