import { createTheme } from '@mui/material'

const appTheme = createTheme({
  palette: {
    primary: {
      main: '#F35823',
      contrastText: '#ffffff',
    },
    background: {
      default: '#878787',
    },
    text: { primary: '#000000' },
  },
})

export default appTheme
