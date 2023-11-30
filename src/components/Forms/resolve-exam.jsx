export default function FormResolve({ resolveAction, questions }) {
  return (
    <form action={resolveAction} className='mt-3 flex flex-col gap-6'>
      {
        questions.map((question, index) => {
          return (
            <fieldset id={question.id} key={question.id} className='w-full bg-gray-100 rounded-md shadow-lg px-4 py-2'>
              <p className='mb-2'><span className='font-semibold mr-1'>{(index + 1)})</span>{question.contenido}</p>
              <hr />
              <div className='flex flex-col gap-2 mt-2'>
                <div className='flex items-center gap-2 mb-2'>
                  <input type='radio' id={question.id + 'opcion1'} name={`${question.id}`} value={question.opcion1} />
                  <label htmlFor={question.id + 'opcion1'}>{question.opcion1}</label>
                </div>
                <div className='flex items-center gap-2 mb-2'>
                  <input type='radio' id={question.id + 'opcion2'} name={`${question.id}`} value={question.opcion2} />
                  <label htmlFor={question.id + 'opcion2'}>{question.opcion2}</label>
                </div>
                <div className='flex items-center gap-2 mb-2'>
                  <input type='radio' id={question.id + 'opcion3'} name={`${question.id}`} value={question.opcion3} />
                  <label htmlFor={question.id + 'opcion3'}>{question.opcion3}</label>
                </div>
                <div className='flex items-center gap-2 mb-2'>
                  <input type='radio' id={question.id + 'opcion4'} name={`${question.id}`} value={question.opcion4} />
                  <label htmlFor={question.id + 'opcion4'}>{question.opcion4}</label>
                </div>
              </div>
            </fieldset>
          )
        })
      }
      <button className='bg-blue-600 text-white px-3 py-2 rounded-md w-36 hover:bg-blue-800 transition-colors text-center font-medium' type='submit'>Finalizar</button>
    </form>
  )
}
