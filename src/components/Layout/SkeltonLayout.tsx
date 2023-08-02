import { CircularProgress } from '@mui/material'
import { Layout } from './Layout'

export const SkeltonLayout: React.FC = () => {
  return (
    <Layout>
      <div className="flex h-[85vh] items-center justify-center">
        <CircularProgress />
      </div>
    </Layout>
  )
}
