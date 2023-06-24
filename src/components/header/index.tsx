import React from 'react'
import { Button, Card} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {setColorPrimary, setDark} from '@/store/slices/theme'
import './index.scss'

const Header = ({title}) => {
    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme)

    return (
        <Card className='M-header'>
            <div className='header-wrapper'>
                <div className='logo-con'>Header:{title}</div>
                <div className='opt-con'>
                    <Button className={theme.dark ? 'dark' : 'light'} shape="circle" onClick={() => dispatch(setDark(!theme.dark))}>{theme.dark ? 'dark' : 'light'}</Button>
                    <Button shape="circle">icon2</Button>
                </div>
            </div>
        </Card>
    )
}

export default Header
