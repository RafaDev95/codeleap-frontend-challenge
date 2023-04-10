type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  name: string
  id?: string
  value?: string
}

const Input = ({ onChange, name, placeholder, id, value }: Props) => {
  return (
    <input
      type="text"
      name={name}
      className="border-#777777 placeholder:text-secondary mt-2 rounded-lg border p-1 outline-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      id={id}
    />
  )
}
export default Input
