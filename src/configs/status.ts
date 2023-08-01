import { Status } from '../types/status'

export const statusConfig: {
  [key in Status]: {
    color: string
    title: string
    circleColor: string
  }
} = {
  todo: {
    color: '#ECEAEA',
    title: 'ToDo',
    circleColor: '#D1D1D6',
  },
  doing: {
    color: '#E4F0E3',
    title: 'In Progress',
    circleColor: '#339505',
  },
  done: {
    color: '#F3E4FA',
    title: 'Done',
    circleColor: '#7441E1',
  },
}
