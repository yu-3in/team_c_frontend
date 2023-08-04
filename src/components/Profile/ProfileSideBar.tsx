import { useQuery } from 'react-query'
import { getMe } from '../../apis/user'
import { Avatar, Divider } from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CategoryIcon from '@mui/icons-material/Category'

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
// }

export const ProfileSideBar: React.FC = () => {
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => {
  //   setOpen(true)
  // }
  // const handleClose = () => setOpen(false)

  const { data: user } = useQuery(['user'], getMe)

  // const handleUpdate = () => {
  //   if (user) {
  //     void updateMe(user)
  //   }

  //   handleClose()
  // }

  return (
    <>
      <div className="flex justify-center">
        <Avatar sx={{ bgcolor: user?.iconColor, width: 100, height: 100, fontSize: '3em' }}>
          {user?.name ? user.name.charAt(0) : ''}
        </Avatar>
      </div>
      <h1 className="my-5 pb-4 text-center text-2xl font-bold">{user?.name}</h1>
      <ul className="space-y-3">
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <ApartmentIcon />
            <h2 className="text-lg font-bold">メールアドレス</h2>
          </div>
          <p className="pl-3">{user?.email ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <ApartmentIcon />
            <h2 className="text-lg font-bold">部署</h2>
          </div>
          <p className="pl-3">{user?.departmentName ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <WysiwygIcon />
            <h2 className="text-lg font-bold">プロダクト</h2>
          </div>
          <p className="pl-3">{user?.productName ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <CategoryIcon />
            <h2 className="text-lg font-bold">注力ジャンル</h2>
          </div>
          <ul className="pl-3">
            {user?.genres && user.genres.length > 0 ? (
              <>
                {user?.genres.map((genre) => (
                  <li key={genre.id}>{genre.title}</li>
                ))}
              </>
            ) : (
              '未設定'
            )}
          </ul>
        </li>
      </ul>
      {/* <Button variant="contained" onClick={handleOpen}>
        プロフィールを編集
      </Button> */}

      {/* モーダル */}
      {/* <Modal
        open={open}
        onClose={handleClose}
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
          <div className="flex gap-3">
            <Button variant="outlined" onClick={handleClose}>
              キャンセル
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              保存
            </Button>
          </div>
        </Box>
      </Modal> */}
    </>
  )
}
