import { inputPrimary } from '~/themes/input'
import { cn } from '~/utils'

interface Props {
  id: string
  rows?: number
  maxRows?: number // 0 means no limit
}

export default function BaseTextarea(props: Props) {
  const rows = props.rows ?? 4
  const maxRows = props.maxRows ?? 0

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(props.id)?.addEventListener('input', autoResize)
  })

  function autoResize() {
    const textarea = document.getElementById(props.id) as HTMLTextAreaElement

    if (!textarea) return

    const overflow = textarea.style.overflow
    textarea.style.overflow = 'hidden'

    const styles = window.getComputedStyle(textarea)
    const paddingTop = Number.parseInt(styles.paddingTop)
    const paddingBottom = Number.parseInt(styles.paddingBottom)
    const padding = paddingTop + paddingBottom
    const lineHeight = Number.parseInt(styles.lineHeight)
    const { scrollHeight } = textarea
    const newRows = (scrollHeight - padding) / lineHeight

    if (newRows > rows) {
      textarea.rows = maxRows ? Math.min(newRows, maxRows) : newRows
    }

    textarea.style.overflow = overflow
  }

  /* 
     Parent with (grid grid-cols-1)
     Child with (col-start-1 row-start-1)

     will make the child span full width of the parent
     hence useful for layering multiple elements on top of each other
  */
  return /* html */ `
  <div class="grid grid-cols-1">
    <textarea 
      id="${props.id}"
      class="${cn(
        inputPrimary,
        'resize-none',
        'col-start-1 row-start-1'
      )}" rows="${rows}"
    ></textarea>
  </div>
  `
}
