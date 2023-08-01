import { Drawer } from '@mui/material'

type DrawerProps = {
  open: boolean
  onClose: () => void
  placement?: 'left' | 'right'
  children: React.ReactNode
}

export const SidePanel: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = 'right',
  children,
}) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor={placement}
        PaperProps={{
          sx: { width: '50%' },
        }}>
        {children}
      </Drawer>
    </>
  )
}
