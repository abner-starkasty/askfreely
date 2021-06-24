import { ButtonHTMLAttributes } from 'react'

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({ isOutlined, ...rest }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...rest} />
  )
}
