"use strict"

/**
  Create a function which, when given an object path, will return the pre-set interface for that path
  @option serviceFactory - factory for getting a service instance
  @option interface - string name of the interface to materialize into
*/
function materialize(opts){
	let
	  serviceFactory= opts.serviceFactory,
	  interfaceName= opts.interface
	return objectPath=> {
		let service= Promise.resolve( serviceFactory())
		return service.then( service=> new Promise(( resolve, reject)=>{
			service.getInterface( objectPath, interfaceName,( err, obj)=> {
				console.log(objectPath, interfaceName)
				if( err) return reject( err)
				resolve( obj)
			})
		}))
	}
}

module.exports= materialize
