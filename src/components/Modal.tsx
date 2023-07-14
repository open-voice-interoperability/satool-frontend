import { FC, ReactNode, useEffect, useState } from 'react'
import s from './Modal.module.scss'
import { clsx as cn } from 'clsx'
import Button from './Button'
import { useTimeoutFn } from '@spartanbits/react'
import ReactModal from 'react-modal'
import { H4, P } from './Text'

type ModalProps = {
  show?: boolean
  title: string
  body: ReactNode
  action: string
  onAction: () => Promise<any>
  onClose?: () => void
  onSuccess?: (result: any) => void
  actionStyle: 'red' | 'primary'
}

const Modal: FC<ModalProps> = ({
  show = false,
  title,
  body,
  action,
  onClose,
  onAction,
  onSuccess,
  actionStyle = 'primary',
}) => {
  const [opacity, setOpacity] = useState(0)
  const [open, setOpen] = useState(show)
  const [setOpacityTimer] = useTimeoutFn()
  const [setOpenTimer] = useTimeoutFn()
  const [showError, setShowError] = useState(false)

  const handleClose = () => {
    onClose?.()
    setShowError(false)
  }

  const handleSuccess = (result: any) => {
    onClose?.()
    onSuccess?.(result)
    setShowError(false)
  }

  const handleAction = () => {
    onAction()
      .then((r) => handleSuccess(r))
      .catch((e) => setShowError(true))
  }

  useEffect(
    () => setOpacityTimer(() => setOpacity(show ? 1 : 0), show ? 50 : 0),
    [show, setOpacity, setOpacityTimer]
  )
  useEffect(() => {
    !show && setOpenTimer(() => setOpen(false), 500)
    show && setOpen(true)
  }, [show, setOpen, setOpenTimer])

  return (
    <ReactModal
      isOpen={open}
      overlayClassName={cn(s.modal)}
      style={{ overlay: { opacity: opacity } }}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <div className={s.close} onClick={handleClose}></div>
      <div className={s.content}>
        <H4>{title}</H4>
        {showError && <P>Error</P>}
        {body}
      </div>
      <div className={s.actions}>
        <Button className={s.accept} style={actionStyle} onClick={handleAction}>
          {action}
        </Button>
      </div>
    </ReactModal>
  )
}

export default Modal
