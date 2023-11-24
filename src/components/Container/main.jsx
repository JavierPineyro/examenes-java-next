export default function Main({ children, classnames }) {
  return (
    <main className={`${classnames} w-full p-2 mb-4`}>
      {children}
    </main>
  )
}
