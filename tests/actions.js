//

import Reduxer from '../src'
import assert from 'assert';


describe('This tests actions suite',function(){
	

	it('expect action args to be the same ',function(){
			
			var MyReduxer = new Reduxer();

			var MyAction = new MyReduxer.Action(function(...args){
				assert.deepEqual(args,[10,20]);
				
				return {
					type : 'Action'
				}
			});

			MyAction.dispatch(10,20);
	});

	


})
