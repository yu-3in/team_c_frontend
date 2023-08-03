import React, { useCallback, useState } from 'react'
import { Navbar, Collapse } from '@material-tailwind/react'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { NavList } from './NavList'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { getMe, signOut } from '../../../apis/user'
import { useQuery } from 'react-query'

export type HeaderProps = {
  //
}

export const Header: React.FC<HeaderProps> = () => {
  const [openNav, setOpenNav] = useState(false)
  const navigate = useNavigate()
  const { data: user } = useQuery(['user'], getMe)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const onLogout = useCallback(() => {
    void signOut().then((_) => {
      navigate('/login')
    })
  }, [])

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <header>
      <Navbar className="mx-auto my-2 max-w-[95%] px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex gap-2">
            <h6
              className="mr-4 cursor-pointer py-1.5 text-inherit lg:ml-2"
              onClick={() => navigate('/')}>
              Ticket
            </h6>
            <div className="hidden lg:block">
              <NavList />
            </div>
          </div>
          <div className="flex">
            <div className="hidden gap-2 lg:flex">
              {user ? (
                <div className="flex items-center gap-3 text-gray-800">
                  <p className="gap-0.5">
                    <span className="font-bold">{user.name}</span>さん
                  </p>
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                    <Menu
                      sx={{ mt: '50px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                      <MenuItem
                        onClick={() => {
                          handleCloseUserMenu()
                          onLogout()
                        }}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>ログアウト</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
              ) : (
                <Button variant="contained">ログイン</Button>
              )}
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
          <div className="-mt-3 pl-4">
            <List disablePadding={md}>
              <ListItemButton className="flex gap-4" onClick={onLogout}>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText className="text-gray-700">ログアウト</ListItemText>
              </ListItemButton>
            </List>
          </div>
        </Collapse>
      </Navbar>
    </header>
  )
}
