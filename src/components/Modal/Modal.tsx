import { useCallback, useEffect, useRef, ReactNode, CSSProperties } from 'react'

export interface ModalProps {
  /**
   * @description
   * The modal component accepts a single child component.
   * The elements in the child component can be in any order.
   * However, at least one of the elements in the child component must be a button to close the modal.
   * 
   * @important
   * The button must have an onClick event handler that resets the showModal state to its initial state.
   * 
   * @example
   * function App() {
   *   const [showModal, setShowModal] = useState<boolean>(false)
   * 
   *   const handleClose = () => {
   *     setShowModal(false)
   *   }
   * 
   *   const ModalChildren = () => {
   *     return (
   *      <div className="modal-content">
   *        <h2>Modal Title</h2>
   *        <button onClick={handleClose} type="button">Close</button>
   *      </div>
   *     );
   *   }
   *   
   *   return (
   *     <div>
   *       <button type='button' onClick={() => setShowModal(true}>Open Modal</button>
   *       <Modal showModal={showModal}>
   *        <ModalChildren/>
   *       </Modal>
   *     </div>
   *   )
   * }
   */
  children: ReactNode
  /**
   * @description
   * The required showModal prop is a boolean that controls whether the modal is visible or not.
   * It is passed from the parent component.
   * 
   * @important
   * The onClick event handler for the close button should set the showModal state to its initial state.
   * 
   * @example
   * function App() {
   *   const [showModal, setShowModal] = useState<boolean>(false)
   * 
   *   const handleClose = () => {
   *     setShowModal(false)
   *   }
   * 
   *   const ModalChildren = () => {
   *     return (
   *      <div className="modal-content">
   *        <h2>Modal Title</h2>
   *        <button onClick={handleClose} type="button">Close</button>
   *      </div>
   *     );
   *   }
   *   
   *   return (
   *     <div>
   *       <button type='button' onClick={() => setShowModal(true}>Open Modal</button>
   *       <Modal showModal={showModal}>
   *        <ModalChildren/>
   *       </Modal>
   *     </div>
   *   )
   * }
   * 
   * @hint You can use your own state management solution if you don't want to use React's built-in useState hook.
   * @hint Inspect the dialog element in your browser's dev tools. Watch the open attribute change as you open and close the modal.
   */
  showModal: boolean
  /**
   * @default 'dialog'
   * @note Only set the role prop if you need to set the role attribute to 'alertdialog'
   */
  role?: "dialog" | "alertdialog"
  /**
   * @description
   * The returnValue prop is the value that is returned when the modal is closed.
   * It can be accessed in the onClose event handler.
   * 
   * @example
   * const onModalClose = (e: { target: { returnValue: string } }) => {
   *  console.log("Modal closed with value: ", e.target.returnValue)
   *  setShowModal(false)
   * }
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue
   */
  returnValue?: string
  /**
   * @description
   * The onClose prop accepts an event handler that is called when the user closes the modal.
   * 
   * @example
   * const onModalClose = () => {
   *   //do something after the modal closes//
   *   console.log("The modal was closed")
   * }
   * 
   * <Modal onClose={onModalClose} showModal={showModal}>
   *    <ModalChildren/>
   * </Modal>
   * 
   * @note This event bubbles in React.
   */
  onClose?: any
  /**
   * @description
   * The onCancel prop accepts an event handler that is called when the user dismisses the modal with the ESC (escape) key.
   * 
   * @example
   *   //Optional, fires after onModalCancel (if onModalCancel is present)
   *   const onModalClose = () => {
   *     console.log("The modal was closed")
   *   }
   * 
   *   //Optional, fires before onModalClose (if onModalClose is present)
   *   const onModalCancel = () => {
   *     console.log("The escape key was pressed")
   *   }
   * 
   * @important
   * The optional onCancel event handler 
   * - is called before the onClose event handler.
   * - is not called when the user clicks the close button.
   * - is not called when the user clicks outside the modal.
   * 
   * @note This event bubbles in React.
   */
  onCancel?: any
  /**
   * @hint You might not need a className prop.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:modal
   * for information about the :modal CSS pseudo-class
   */
  className?: string
  /**
   * @note The id property must be unique in the document.
   */
  id?: string
  /**
   * @description
   * Prefer className prop or :modal CSS pseudo-class over inline CSS styles
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:modal
   * for information about the :modal CSS pseudo-class
   */
  style?: CSSProperties
  /**
   * @example
   * { 'aria-label': 'My dialog', 
   *   'aria-labelled-by': 'dialogTitle', 
   *   'aria-described-by': 'dialogDescription' }
   */
  ariaAttributes?: { [key: string]: string }
  /**
   * @example
   * { 'data-id': 'test-dialog', 'data-number': '123' }
   */
  dataAttributes?: { [key: string]: string }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
   * for more information about the lang attribute and language codes
   */
  lang?: string
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate
   */
  translate?: "yes" | "no"
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir
   * for more information about the dir attribute
   */
  dir?: "ltr" | "rtl" | "auto"
  /**
   * @hint It is unlikely that you will need to use the key prop, but just in case...
   * @see https://react.dev/reference/react/useState#resetting-state-with-a-key
   * @see https://react.dev/learn/rendering-lists#rules-of-keys
   */
  key?: string
  /**
   * @description
   * The animateClass prop accepts a string that is used to add a CSS animation class to the dialog element.
   *
   * @example
   * //Here the .close class is the animateClass prop value.
   * <Modal animateClass="close" showModal={showModal}>
   * 
   * CSS
   * @description
   * - Fadout animation of the modal backdrop
   * - The :backdrop CSS pseudo-class is used to style the modal backdrop
   * 
   * @example
   * dialog.close::backdrop { animation: fadeout 1s forwards; }
   * 
   * @description
   * - Fadeout animation of the dialog element itself (the modal)
   * - The :modal CSS pseudo-class is used to style the dialog element while it is open (showing)
   * 
   * @example
   * dialog.close:modal { animation: fadeout 1s forwards; }
   *
   * @description
   * - The animateClass is not needed for a fadein animation
   * - The fadeout animation is triggered by the animateClass prop value (in this case, "close")
   * 
   * @example
   *  /@keyframes fadein {
   *   from { opacity: 0; }
   *   to { opacity: 1; }
   *  }
   * 
   *  /@keyframes fadeout {
   *   from { opacity: 1; }
   *   to { opacity: 0; }
   *  }
   */
  animateClass?: string
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot
   * for more information about the slot attribute
   */
  slot?: string
}

const Modal = (
  {
    children,
    showModal,
    returnValue,
    onClose,
    onCancel,
    className,
    id,
    style,
    role = "dialog",
    ariaAttributes,
    dataAttributes,
    lang,
    translate,
    dir,
    key,
    animateClass,
    slot
  }: ModalProps) => {

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = useCallback(() => {
    dialogRef.current?.close(`${returnValue}`)
  }, [returnValue]);

  const handleClose = useCallback(() => {
    if (!animateClass) {
      closeModal()
      return
    }

    const closeAndCleanup = () => {
      closeModal()
      dialogRef.current?.classList.remove(`${animateClass}`);
      dialogRef.current?.removeEventListener('animationend', closeAndCleanup);
    }

    dialogRef.current?.addEventListener('animationend', closeAndCleanup);
    dialogRef.current?.classList.add(`${animateClass}`);

  }, [animateClass, closeModal])

  useEffect(() => {
    if (!showModal) return

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    return () => {
      handleClose()
    }
  }, [showModal, handleClose]);


  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel && onCancel}
      onClose={onClose && onClose}
      id={id && id}
      className={className && className}
      style={style && style}
      role={role && role}
      {...ariaAttributes}
      {...dataAttributes}
      lang={lang && lang}
      translate={translate && translate}
      dir={dir && dir}
      key={key && key}
      slot={slot && slot}
    >
      {children}
    </dialog>
  );
}

export default Modal;