import { Button } from '../Components/Button/Button'
import { Layout } from '../components/Layout/Layout'
import { SidePanel } from '../components/Panel/SidePanel'
import { useState } from 'react'
import { IconButton, Input, Textarea, Typography } from '@material-tailwind/react'

export const Home: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <Layout>
      <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
      <SidePanel open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Contact Us
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={() => setOpenDrawer(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Input type="email" label="Email" />
          <Input label="Subject" />
          <Textarea rows={6} label="Message" />
          <Button>Send Message</Button>
        </form>
      </SidePanel>
    </Layout>
  )
}
