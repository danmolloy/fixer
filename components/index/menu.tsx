
interface MenuProps {
  children: React.ReactNode
}

export default function Menu(props: MenuProps) {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  )
}