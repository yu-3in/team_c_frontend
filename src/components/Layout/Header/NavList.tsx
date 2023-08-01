import React from 'react'
import { Typography, ListItem, List, ListItemPrefix } from '@material-tailwind/react'
import { FiUser } from 'react-icons/fi'
import { GrSchedule } from 'react-icons/gr'
import { BiBookBookmark } from 'react-icons/bi'

const navListMenuItems = [
  {
    icon: <BiBookBookmark />,
    title: 'チケット',
  },
  {
    icon: <GrSchedule />,
    title: 'カレンダー',
  },
  {
    icon: <FiUser />,
    title: 'プロフィール',
  },
]

export const NavList: React.FC = () => {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      {navListMenuItems.map(({ icon, title }, key) => (
        <Typography color="blue-gray" className="font-normal" key={key}>
          <ListItem className="flex items-center py-2 pr-4">
            <ListItemPrefix>{icon}</ListItemPrefix>
            {title}
          </ListItem>
        </Typography>
      ))}
    </List>
  )
}
