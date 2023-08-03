import { useQuery } from 'react-query'
import { getMe } from '../../apis/user'
import { Avatar, Divider } from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CategoryIcon from '@mui/icons-material/Category'

export const ProfileSideBar: React.FC = () => {
  const { data: user } = useQuery(['users'], getMe)

  return (
    <>
      <div className="flex justify-center">
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <h1 className="my-5 pb-4 text-center text-2xl font-bold">{user?.name}</h1>
      <ul className="space-y-3">
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
    </>
  )
}
