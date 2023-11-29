import { deleteQuestion, updateQuestion } from '@/lib/actions'
import ModalDelete from '@/components/Modal/delete-modal'
import UpdateQuestionModal from '@/components/Modal/update-question'

export default function QuestionItem({ question, examId, num, token }) {
  const deleteAction = deleteQuestion.bind(null, { token, examId, id: question.id })
  const updateAction = updateQuestion.bind(null, { token, examId, id: question.id })

  return (
    <div className='p-2 shadow-md rounded-md bg-gray-200/60'>
      <header className='flex text-lg items-center gap-2'>
        <span className='font-bold pr-4'>{num})</span>
        <span>{question.contenido}</span>
      </header>
      <div className='columns-2 p-5 tex-md'>
        <p className='mb-1'>A)<span className='font-bold'> {question.opcion1}</span></p>
        <p className='mb-1'>B)<span className='font-bold'> {question.opcion2}</span></p>
        <p className='mb-1'>C)<span className='font-bold'> {question.opcion3}</span></p>
        <p className='mb-1'>D)<span className='font-bold'> {question.opcion4}</span></p>
      </div>
      <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700' />
      <div className='flex items-center w-full '>
        <p className='grow text-lg'>Respuesta: <span className='font-bold text-blue-700'>{question.respuesta}</span>
        </p>
        <div className='flex gap-1 pr-5'>
          <ModalDelete deleteAction={deleteAction} />
          <UpdateQuestionModal updateAction={updateAction} question={question} />
        </div>
      </div>
    </div>
  )
}
