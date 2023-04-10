type Props = {
  children: string
  disabled?: boolean
  className?: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: (e: any) => void
}

const Button = ({
  children,
  disabled,
  type = 'button',
  onClick,
  className
}: Props) => {
  return (
    <button
      className={`+ ml-auto mt-[16px] rounded-lg
     bg-main-blue px-6 py-1 font-bold text-white transition ease-in-out hover:bg-[#5e77bd] disabled:bg-text-secondary ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
