import React from "react";
import {Outlet, useLocation} from 'react-router-dom'
import Header from '@/components/header'
import {useSelector} from 'react-redux'
import {ConfigProvider, theme} from 'antd'
import {useToaster, resolveValue, ToasterProps} from 'react-hot-toast'
import './index.scss'

const {darkAlgorithm, defaultAlgorithm} = theme

const CustomToaster = ({toastOptions, containerStyle}: ToasterProps) => {
	const {toasts, handlers} = useToaster(toastOptions)

	return (
		<div
			className="ToastModal"
			style={{
				position: 'fixed',
				zIndex: 9999,
				// inset: 0,
				...containerStyle
			}}
		>
			{toasts
				.filter(t => t.visible)
				.map((toast) => (
					<div key={toast.id}>
						{resolveValue(toast.message, toast)}
					</div>
				))
			}
		</div>
	)
}

const Entry = () => {

    const location = useLocation()

    const globalTheme = useSelector((state: any) => state.theme)

    let antdTheme = {
			algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm
    }

    return (
			<ConfigProvider theme={antdTheme}>
				<div className='M-entry'>
					<Header title={location.pathname} />
					<div className='main-container'>
						<Outlet />
					</div>
					<CustomToaster />
				</div>
			</ConfigProvider>
    )
}

export default Entry
