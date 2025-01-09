const primary =  'nuetral'
const highlight =  'white'
const accent =  'blue'
function defaultTheme () {
	return {
		accent1: "bg-blue-100",
    accent2: "bg-gray-300",
    accent3: "bg-gray-400",
    accent4: "bg-gray-500",
		transition: "transition ease-in-out duration-150",
		landing: {
			wrapper: 'p-4 border-2 border-blue-300'
		},
		table: {
			'table': 'min-w-full divide-y divide-gray-300',
			'thead': '',
			'th': 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900',
			'tbody': 'divide-y divide-gray-200 ',
			'td': 'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
		},
		textarea: {
			viewWrapper: 'overflow-hidden p-2 bg-gray-100 border-b-2'
		},
		card: {
			wrapper: 'p-4',
			row: 'flex py-1',
			rowLabel: 'px-4 w-28 text-sm',
			rowContent: 'flex-1'
		},
		tile: "bg-[#EEEEEE] py-8 px-10  border-t-4 border-[#679d89] rounded-t",
		button: (opts = {}) => {
			const {color = 'tig', size = 'base', width = 'block'} = opts
			let colors = {
				white: `
						border border-gray-300  text-gray-700 bg-white hover:text-gray-500
						focus:outline-none focus:shadow-outline-blue focus:border-blue-300
						active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out
				`,
				tig:`
						h-full hover:bg-[#EEEEEE] hover:text-yellow-500 hover:cursor-pointer 
						bg-[#D2D2D2] text-[13px] font-light md:mr-2
				`,
				cancel: `
						border border-red-300  text-red-700 bg-white hover:text-red-500
						focus:outline-none focus:shadow-outline-blue focus:border-blue-300
						active:text-red-800 active:bg-gray-50 transition duration-150 ease-in-out
				`,
				transparent: `
						border border-gray-300  text-gray-700 bg-white hover:text-gray-500
						focus:outline-none focus:shadow-outline-blue focus:border-blue-300
						active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out
				`,
				primary: `
						border border-transparent shadow 
						text-sm leading-4 rounded-sm text-white bg-blue-600 hover:bg-blue-700 
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`,
				danger: `
						border border-transparent shadow 
						text-sm leading-4 rounded-sm text-white bg-red-600 hover:bg-red-700 
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`
			}
			let sizes  = { 
					base: 'px-4 py-4 leading-5 font-medium',
					sm: 'text-sm px-2 py-2 leading-5 font-medium',
					lg: 'text-lg px-6 py-6 leading-5 font-medium',
					xl: 'text-2xl px-12 py-8 leading-5 font-medium'
			}
			let widths = {
					'block': '',
					'full' : 'w-full'
			}

			return {
					button: `
						capitalize disabled:cursor-not-allowed cursor-pointer
						${colors[color]} ${sizes[size]} ${widths[width]}
					`,
					vars: {
							color: colors,
							size: sizes,
							width: widths
					}
			} 
		},
    input: (opts = {}) => {
			const {color = 'white', size = 'small', width = 'block'} = opts
			let colors = {
					white: 'bg-white',
					gray: 'bg-gray-100'
			}

			let sizes  = {
					base: 'px-4 py-4 font-medium',
					small: 'text-sm px-2 py-2 font-medium text-xs',
					large: 'text-lg px-6 py-6 font-medium text-xl'
			}

			let widths = {
					'block': '',
					'full' : 'w-full'
			}

			return {
					input: `
						border-b border-gray-300  disabled:bg-gray-200
						${colors[color]} ${sizes[size]} ${widths[width]}
					`,
					vars: {
							color: colors,
							size: sizes,
							width: widths
					}
			}
		},
		select: (opts={}) => {
			const { color = 'white' } = opts
			let colors = {
				white: 'white',
				transparent: 'gray-100 border border-gray-200 shadow-sm'
			}
			return {
				menuWrapper: `bg-${colors[color]} my-1`,
				menuItemActive: `px-4 py-2 cursor-not-allowed bg-${accent}-200 border-1 focus:border-${accent}-300`,
				menuItem: `px-4 py-2 cursor-pointer hover:bg-blue-100 border-1 border-${colors[color]} focus:border-blue-300`,
				select: `rounded px-1 bg-${colors[color]} w-full flex flex-row flex-wrap py-2 cursor-pointer focus:border-blue-300`,
				selectIcon: `fal fa-angle-down text-gray-400 pt-1`,
				valueItem: `overflow-hidden text-ellipsis whitespace-nowrap`,
				itemText: `w-32 text-gray-400`,
			  menuBgActive: `bg-blue-100 rounded overflow-visible text-gray-700`
			}
		},
		table: (opts = {color:'white', size: 'compact'}) => {
			const {color = 'white', size = 'compact'} = opts
			let colors = {
					white: 'bg-white hover:bg-gray-100',
					gray: 'bg-gray-100 hover:bg-gray-200',
					transparent: 'gray-100'
			}

			let sizes = {
					small: 'px-1 py-1 text-xs',
					compact: 'px-2 py-1 text-sm',
					full: 'px-10 py-5'
			}
			return {
					tableHeader:
							`${sizes[size]} pb-1 h-8 border border-b-4 border-gray-200 bg-white text-left font-medium text-gray-700 uppercase first:rounded-tl-md last:rounded-tr-md capitalize Class
							Properties
							align-baseline	vertical-align: baseline;
							align-top`,
					tableInfoBar: "bg-white",
					tableRow: `${colors[color]} transition ease-in-out duration-150 hover:bg-gray-300`,
					tableRowStriped: `bg-white odd:bg-[#F9F9F9] hover:bg-[#E6E6E6] bg-opacity-25 transition ease-in-out duration-150`,
					tableCell: `${sizes[size]} break-words border border-gray-200 pl-1 align-top font-light text-sm`,
					inputSmall: 'w-24',
					sortIconDown: 'fas fa-sort-amount-down text-gray-300 opacity-75',
					sortIconUp: 'fas fa-sort-amount-up text-gray-300 opacity-75',
					sortIconIdeal: 'fa fa-sort-alt text-gray-300 opacity-25',
					vars: {
							color: colors,
							size: sizes
					}
			}
		},
	}
}

export default defaultTheme()