import React from 'react'
import Wrappers from '../wrappers'
import Components from '../components'
import { matchRoutes } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import AmsReduxWrapper from '../wrappers/ams-redux'
import AmsRouterWrapper from '../wrappers/ams-router'

const DefaultComponent = Components['ams-default']
let childKey = 0


function configMatcher (config, path ) {

	// matchRoutes picks best from all available routes in config

	const matches = matchRoutes(config.map(d => ({path:d.path})), {pathname:path}) || []
	// console.log('configMatcher', config, matches, path)

	// hash matches by route path
	let matchHash = matches.reduce((out,c) => {
		out[c.route.path] = c
		return out
	},{})

	// return fitlered configs for best matches
	// and add extracted params from matchRoutes
	return config.filter((d,i) => {
		let match = matchHash?.[d.path] || false
		if(match){
			d.params = match.params
		}
		return match
	})
}


export function getActiveView(config, path) {
	// add '' to params array to allow root (/) route  matching
	let activeConfigs = configMatcher(config,path)
console.log("getActiveView", config, path, activeConfigs)

	// console.log('activeConfigs', activeConfigs, path)
	// get the component for the active config
	// or the default component
	return activeConfigs.map(activeConfig => {
		const Comp = typeof activeConfig.type === 'function' ?
			activeConfig.type :
			Components[activeConfig.type] || DefaultComponent

		// get the wrapper for the config, or the default wrapper
		//const Wrapper = Wrappers[activeConfig.action] || DefaultWrapper

		// if there are children
		let children = []
		if(activeConfig.children) {
			children = getActiveView(activeConfig.children, path,format, depth+1)
		}

		let WrappedComp = AmsRouterWrapper(AmsReduxWrapper(Comp))
		//console.log('wrapper', activeConfig.action, activeConfig.type)
		return <WrappedComp
			key={childKey++}
			{...activeConfig}
			{...activeConfig.props}
			children={children}
			location={{}}
		/>
	})
}


export function getActiveConfig (config=[], path='/', depth = 0) {

	let configs = cloneDeep(configMatcher(config,path, depth))

	configs.forEach(out => {
		out.children = getActiveConfig(out.children, path, depth+1)
	})
	return configs || []
}





export function validFormat(format) {
	// ----------------------------------
	// to do
	// ----------------------------------
	return format.children && Array.isArray(format.children) // lol

}
