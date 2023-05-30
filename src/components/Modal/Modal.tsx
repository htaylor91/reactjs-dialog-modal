import { useCallback, useEffect, useRef, ReactNode, CSSProperties } from 'react'

export interface ModalProps {
  /**
   * @important reset showModal state to false in the onClose event handler
   * @example
   * const onModalClose = () => {
   *   //do something after the modal closes//
   *   setShowModal(false) 
   * }
   * 
   * @important pass the onModalClose handler to the onClose prop
   * @example
   * <Modal onClose={onModalClose} showModal={showModal}>
   *    {modalChildren}
   * </Modal>
   * 
   * @note This event bubbles in React.
   */
  onClose: (args?: any) => void
  /**
   * @description
   * The children prop is a function that returns the content of the modal.
   * 
   * It receives the handleClose function as an argument,
   * 
   * which is used as the onClick event handler for the close button.
   * @example
   * const modalChildren = (handleClose: () => void) => {
   *  return (
   *   <>
   *    <h2>Modal Title</h2>
   *    <button onClick={handleClose} type="button">Close</button>
   *   </>
   *  )
   * }
   * 
   * @important pass the modalChildren function to the children prop of the Modal component
   * @example
   *  <Modal onClose={onModalClose} showModal={showModal}>
   *    {modalChildren}
   *  </Modal>
   * 
   */
  children: (handleClose: () => void) => ReactNode
  /**
   * @description
   * The showModal prop is a boolean that controls whether the modal is visible or not.
   * It is passed from the parent component.
   * @example
   * function App() {
   *   const [showModal, setShowModal] = useState<boolean>(false)
   * 
   *   const onModalClose = () => {
   *     setShowModal(false)
   *   }
   * 
   *   const modalChildren = (handleClose: () => void) => {
   *     return (
   *      <>
   *        <h2>Modal Title</h2>
   *        <button onClick={handleClose} type="button">Close</button>
   *      </>
   *     )
   *   }
   *   
   *   return (
   *    <div>
   *      <button type='button' onClick={() => setShowModal(showModal => !showModal)}>Open Modal</button>
   *      {<Modal onClose={onModalClose} showModal={showModal}>
   *       {modalChildren}
   *      </Modal>}
   *    </div>
   *   )
   * }
   * 
   * @hint You can your own state management solution if you don't want to use React's built-in useState hook.
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
   * The onCancel prop accepts an event handler that is called when the user dismisses the modal with the ESC (escape) key.
   * 
   * @example
   *   //Required, fires after onModalCancel (if onModalCancel is present)
   *   const onModalClose = () => {
   *     console.log("The modal was closed")
   *     setShowModal(false)
   *   }
   * 
   *   //Optional, fires before onModalClose
   *   const onModalCancel = () => {
   *     console.log("The escape key was pressed")
   *   }
   * 
   * @important
   * The optional onCancel event handler 
   * - is called before the required onClose event handler.
   * - is not called when the user clicks the close button.
   * - is not called when the user clicks outside the modal.
   * 
   * @note This event bubbles in React.
   */
  onCancel?: (args?: any) => void
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
}

const Modal = (
  {
    onClose,
    children,
    showModal,
    returnValue,
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
  }: ModalProps) => {

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current?.open && showModal) {
      dialogRef.current.showModal();
    }
  }, [showModal]);

  const handleClose = useCallback(() => {
    if (dialogRef.current?.open) {
      dialogRef.current.close(`${returnValue}`);
    }
  }, [returnValue]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel && onCancel}
      onClose={onClose}
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
    >
      {children(handleClose)}
    </dialog>
  );
}

export default Modal;