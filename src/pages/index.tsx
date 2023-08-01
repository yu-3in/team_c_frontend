import { Button } from '@material-tailwind/react'
import { Layout } from '../components/Layout/Layout'

export const Home: React.FC = () => {
  return (
    <Layout>
      <div className="bg-red-200">
        <Button>ホゲ</Button>
      </div>
    </Layout>
  )
}
