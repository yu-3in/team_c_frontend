import React from 'react'
import { ListItemPrefix, Typography } from '@material-tailwind/react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { Divider, List, ListItem, ListItemButton, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const navListMenuItems = [
  {
    icon: <CollectionsBookmarkOutlinedIcon />,
    title: 'チケット',
    to: '/tickets',
  },
  {
    icon: <CalendarMonthIcon />,
    title: 'カレンダー',
    to: '/calendar',
  },
  {
    icon: <PersonOutlineOutlinedIcon />,
    title: 'プロフィール',
    to: '/profile',
  },
]

export const NavList: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const lg = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <List
      disablePadding={lg}
      className="m-0 flex flex-col p-0 text-gray-800 lg:mb-0 lg:mt-0 lg:flex-row">
      className="m-0 flex flex-col p-0 text-gray-800 lg:mb-0 lg:mt-0 lg:flex-row">
      {navListMenuItems.map(({ icon, title, to },index) => (
        <>
          <Typography key={title}>
            <ListItem className="flex items-center" dense={lg}>
              <ListItemButton onClick={() => navigate(to)}>
                <ListItemPrefix>{icon}</ListItemPrefix>
                {title}
              </ListItemButton>
            </ListItem>
          </Typography>
          {navListMenuItems.length-1!==index&&<Divider orientation="vertical" flexItem />}
        </>
      ))}
    </List>
  )
}
