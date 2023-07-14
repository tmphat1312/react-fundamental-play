import { toast } from 'react-toastify'
import { getContrastTextColor } from './utils'

/* eslint-disable */
function SingleColor({ color }) {
  const { hex, weight, type } = color
  const style = {
    backgroundColor: `#${hex}`,
    color: getContrastTextColor(`#${hex}`),
  }

  async function saveToClipboard() {
    if (!navigator.clipboard) {
      toast.warning('Clipboard API access is not available')
      return
    }

    try {
      await navigator.clipboard.writeText(`#${hex}`)
      toast.success(`Copied #${hex} to clipboard`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <article className='color' style={style} onClick={saveToClipboard}>
      <p>{weight}%</p>
      <p>#{hex}</p>
    </article>
  )
}
export default SingleColor
