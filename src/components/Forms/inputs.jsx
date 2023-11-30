'use client'

export default function Inputs({ questions }) {
  return (
    <>
      {
        questions.map((question, index) => (
          <fieldset id={question.id} key={question.id} className='w-full bg-gray-100 rounded-md shadow-lg px-4 py-2'>
            <p className='mb-2'><span className='font-semibold mr-1'>{(index + 1)})</span>{question.contenido}</p>
            <hr />
            <div className='flex flex-col gap-2 mt-2' action=''>
              <div className='flex items-center gap-2 mb-2'>
                <input type='radio' id='opcion1' name={'name-' + question.id} value={question.opcion1} />
                <label htmlFor='opcion1'>{question.opcion1}</label>
              </div>
              <div className='flex items-center gap-2 mb-2'>
                <input type='radio' id='opcion2' name={'name-' + question.id} value={question.opcion2} />
                <label htmlFor='opcion2'>{question.opcion2}</label>
              </div>
              <div className='flex items-center gap-2 mb-2'>
                <input type='radio' id='opcion3' name={'name-' + question.id} value={question.opcion3} />
                <label htmlFor='opcion3'>{question.opcion3}</label>
              </div>
              <div className='flex items-center gap-2 mb-2'>
                <input type='radio' id='opcion4' name={'name-' + question.id} value={question.opcion4} />
                <label htmlFor='opcion4'>{question.opcion4}</label>
              </div>
            </div>
          </fieldset>
        ))
      }
    </>
  )
}
