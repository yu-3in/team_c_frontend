import { createTheme } from '@mui/material'

const appTheme = createTheme({
  palette: {
    primary: {
      main: '#F35823',
      contrastText: '#ffffff',
    },
    background: {
      default: '#636366',
    },
    text: { primary: '#ffffff' },
  },
})

export default appTheme
