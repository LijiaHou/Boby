import {createSlice} from '@reduxjs/toolkit'
import {globalConfig} from '@/globalConfig'

const sessionTheme = JSON.parse(window.localStorage.getItem(globalConfig.SESSION_LOGIN_THEME))

const initTheme = sessionTheme ? sessionTheme : globalConfig.initTheme

const initialState = {
    dark: initTheme.dark,
    colorPrimary: initTheme.colorPrimary,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // 设置暗色、亮色主题
        setDark: (state, action) => {
            state.dark = action.payload
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_THEME, JSON.stringify(state))
        },
        setColorPrimary: (state, action) => {
            state.colorPrimary = action.payload
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_THEME, JSON.stringify(state))
        }
    }
})

export const {setDark, setColorPrimary} = themeSlice.actions

export default themeSlice.reducer
