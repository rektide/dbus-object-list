"use strict"

/**
  Create a function which, when given an object path, will return the pre-set interface for that path
  @option serviceFactory - factory for getting a service instance
  @option interface - string name of the interface to materialize into
*/
function materialize(opts){
	let
	  serviceFactory= opts.serviceFactory,
	  interfaceName= opts.interface,
	  pathCache= opts.pathCache,
	  type= opts.type
	return objectPath=> {	
		let cached= pathCache&& pathCache[ objectPath]
		if( cached) return cached;
		let
		  service= Promise.resolve(serviceFactory()),
		  materialized= service.then( service=> new Promise(( resolve, reject)=>{
			service.getInterface( objectPath, interfaceName,( err, obj)=> {
				if( err) return reject( err)
				if( type){
					return type.call( obj, opts).then(()=> resolve( obj)) // enhance obj with type
				}else{
					resolve( obj)
				}
			})
		}))
		if( pathCache){
			pathCache[ objectPath]= materialized
		}
		return materialized
	}
}

module.exports= materialize
