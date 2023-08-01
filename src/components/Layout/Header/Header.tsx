import React, { useState } from 'react'
import { Navbar, Collapse, Typography, Button, IconButton } from '@material-tailwind/react'
import { NavList } from './NavList'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoCloseOutline, IoLogOutOutline } from 'react-icons/io5'

export type HeaderProps = {
  //
}

export const Header: React.FC<HeaderProps> = () => {
  const [openNav, setOpenNav] = useState(false)

  return (
    <header>
      <Navbar className="mx-auto my-2 max-w-[95%] px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            Headier
          </Typography>
          <div className="flex">
            <div className="hidden lg:block">
              <NavList />
            </div>
            <div className="hidden gap-2 lg:flex">
              {/* <Button variant="text" color="blue-gray">
                ログイン
              </Button> */}
              <IconButton color="teal">
                <IoLogOutOutline />
              </IconButton>
            </div>
            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? <IoCloseOutline /> : <RxHamburgerMenu />}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Sign In
            </Button>
            <Button variant="gradient" size="sm" fullWidth>
              Sign Up
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </header>
  )
}
