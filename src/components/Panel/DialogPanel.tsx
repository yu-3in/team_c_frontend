import * as React from 'react'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Dialog from '@mui/material/Dialog'

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
  datas: string[] // 選択項目のデータ
}

export const DialogPanel = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open, datas } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth sx={{ boxShadow: 1 }}>
      <List sx={{ p: 2 }}>
        {datas.map((data) => (
          <ListItem disableGutters key={data}>
            <ListItemButton onClick={() => handleListItemClick(data)} key={data}>
              <p>{data}</p>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

// ここから使い方
export const SimpleDialogDemo = () => {
  const sampleDatas = ['username@gmail.com', 'user02@gmail.com', 'aaa']
  const [open, setOpen] = React.useState(true)
  const [selectedValue, setSelectedValue] = React.useState(sampleDatas[1]) // 選択中の項目を管理

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div>
      <p>選択中の項目名: {selectedValue}</p>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        開く
      </Button>
      <DialogPanel
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        datas={sampleDatas}
      />
    </div>
  )
}
