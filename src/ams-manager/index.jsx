import React from 'react'
import { useLocation } from 'react-router-dom'
import comps from '../components'
import { getActiveView, validFormat } from './_utils'
import ThemeContext from '../theme'
import defaultTheme from '../theme/default-theme'

const { InvalidConfig, NoRouteMatch } = comps


const AmsManager = ({ config, path='', user={}, theme=defaultTheme, ...props}) => {
	// console.log('AmsManager', props)
	const location = useLocation()
	// check for valid config
	
	if(!validFormat(config)) {
		return <InvalidConfig config={config} />
	}
	
	const RenderView = getActiveView(config.children, path, location)
	if(!RenderView) {
		return <NoRouteMatch path={path} />
	}

	return (
		<ThemeContext.Provider value={theme}>
			{RenderView}
		</ThemeContext.Provider>
	)	
}

export default AmsManager