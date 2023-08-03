// import { useQuery } from 'react-query'
// import { getMe } from '../../apis/user'
import { Avatar, Divider } from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CategoryIcon from '@mui/icons-material/Category'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
// import { User } from '../../types/user'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}

// type Props = {
//   id: string;
// };
export const ProfileSideBar = () => {
  // 編集用
  const [name, setName] = useState<string>('')
  const [departmentName, setDepartmentName] = useState<string>('')
  const [productName, setProductName] = useState<string>('')
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex justify-center">
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <h1 className="my-5 pb-4 text-center text-2xl font-bold">{}</h1>
      <ul className="space-y-3">
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <ApartmentIcon />
            <h2 className="text-lg font-bold">部署</h2>
          </div>
          <p className="pl-3">{departmentName ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <WysiwygIcon />
            <h2 className="text-lg font-bold">プロダクト</h2>
          </div>
          <p className="pl-3">{productName ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <CategoryIcon />
            <h2 className="text-lg font-bold">注力ジャンル</h2>
          </div>
          <ul className="pl-3">
            {/* {user?.genres && user.genres.length > 0 ? (
              <>
                {user?.genres.map((genre) => (
                  <li key={genre.id}>{genre.title}</li>
                ))}
              </>
            ) : (
              '未設定'
            )} */}
          </ul>
        </li>
      </ul>
      <Button variant="contained" onClick={() => setOpen(true)}>
        プロフィールを編集
      </Button>

      {/* モーダル */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h1 className="font-bold">プロフィール編集</h1>
          <div className="flex flex-col gap-2">
            <div className="flex-co flex gap-2">
              <label className="">名前</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex-co flex gap-2">
              <label>部署</label>
              <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <div className="flex-co flex gap-2">
              <label>プロダクト</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
