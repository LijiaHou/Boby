import {Outlet, useLocation} from 'react-router-dom'
import Header from '@/components/header'
import {useSelector} from 'react-redux'
import {ConfigProvider, theme} from 'antd'
import './index.scss'

const {darkAlgorithm, defaultAlgorithm} = theme

const Entry = () => {

    const location = useLocation()

    const globalTheme = useSelector((state) => state.theme)

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
            </div>
        </ConfigProvider>
    )
}

export default Entry
