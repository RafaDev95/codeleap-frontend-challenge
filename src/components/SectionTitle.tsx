type Props = {
  children: string
  color?: 'white' | 'black'
}

const SectionTitle = ({ children, color = 'black' }: Props) => {
  return <h1 className={`text-lg font-bold text-${color}`}>{children}</h1>
}
export default SectionTitle
