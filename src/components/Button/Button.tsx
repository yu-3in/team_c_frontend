import React from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  // children:React.ReactNode
  value: string
}
export const Button: React.FC<ButtonProps> = ({ value }) => {
  return <button className={styles.button}>{value}</button>
}
