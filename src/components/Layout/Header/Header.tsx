import React, { useState } from 'react'
import { Navbar, Collapse } from '@material-tailwind/react'
import { Button, IconButton } from '@mui/material'
import { NavList } from './NavList'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

export type HeaderProps = {
  //
}

export const Header: React.FC<HeaderProps> = () => {
  const [openNav, setOpenNav] = useState(false)
  const navigate = useNavigate()

  return (
    <header>
      <Navbar className="mx-auto my-2 max-w-[95%] px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <h6
            className="cursor-pointer py-1.5 text-inherit lg:ml-2 ml-0"
            onClick={() => navigate('/')}
            style={h6Style}>
            Header
          </h6>
          <div className="flex">
          <NavList />
            <div className="hidden gap-2 lg:flex">
              {/* <Button variant="text" color="blue-gray">
                ログイン
              </Button> */}
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </div>
            <div className="lg:hidden">
              <IconButton className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
                {openNav ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </div>
          </div>
        </div>
        <Collapse open={openNav} className="lg:hidden">
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2">
            <Button variant="outlined" size="small" fullWidth>
              Sign In
            </Button>
            <Button variant="contained" size="small" fullWidth>
              Sign Up
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </header>
  )
}
