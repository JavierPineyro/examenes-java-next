export default function ResultsPage({ searchParams }) {
  const respuestasCorrectas = searchParams.respuestasCorrectas || ''
  const puntos = searchParams.puntos || ''
  const message = searchParams.message || ''
  return (
    <div>
      ResultsPage
      <p>{message}</p>
      <p>{respuestasCorrectas}</p>
      <strong>{puntos}</strong>
    </div>
  )
}
