import type { ReactNode } from 'react'
import Icon from './Icon'

/** 아래에서 올라오는 시트 (시안 02·09·10) */
export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="overlay" role="dialog" aria-modal aria-label={title}>
      <div className="dim" onClick={onClose} />
      <div className="sheet anim-in">
        <div className="grab" />
        <div className="sheet-h">
          {title}
          <button className="x" onClick={onClose} aria-label="닫기">
            <Icon name="close" size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/** 가운데 모달 (시안 05·12) */
export function Modal({ children, onClose }: { children: ReactNode; onClose?: () => void }) {
  return (
    <div className="overlay">
      <div className="dim" onClick={onClose} />
      <div className="modal anim-in" role="alertdialog" aria-modal>
        {children}
      </div>
    </div>
  )
}
