import React from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'fill' | 'outline'
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'fill' }) => {
  return (
    <button className={variant === 'fill' ? styles.button_fill : styles.button_outline}>
      {children}
    </button>
  )
}
