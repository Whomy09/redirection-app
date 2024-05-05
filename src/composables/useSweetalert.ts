import Swal from 'sweetalert2'

export const useSweetalert = () => {
  async function showQuestion(title: string, text: string) {
    const { isConfirmed } = await Swal.fire({
      text,
      title,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<span>Si</span>',
      cancelButtonText: '<span>No</span>',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
    return isConfirmed
  }

  return {
    showQuestion
  }
}
