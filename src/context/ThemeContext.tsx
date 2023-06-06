import React, { FC, useEffect, useState } from 'react'

interface IThemeProvider {
  children: any
}

interface IContext {
  theme: string,
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<IContext>({
  theme: 'light',
  toggleTheme: () => { }
})

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    console.log(theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

