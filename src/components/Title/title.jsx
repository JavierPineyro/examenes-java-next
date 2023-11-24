export default function Title({ children, styles = '' }) {
  return (
    <h2 className={`text-xl font-semibold ${styles}`}>{children}</h2>
  )
}
