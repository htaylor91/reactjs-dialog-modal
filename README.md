# ReactJS Dialog Modal

## Description

A ReactJS modal component built with the HTML5 dialog element.

## Code Sandbox

Try it out ⬇
[Codesandbox](https://codesandbox.io/p/github/htaylor91/reactjs-dialog-modal-sandbox/master?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clir0x7e4000b356prze2hix8%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clir0x7e4000d356pey2daawr%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clir0x7e4000b356prze2hix8%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clir0x7e4000a356p0nxp5237%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522clir0x7e4000b356prze2hix8%2522%252C%2522activeTabId%2522%253A%2522clir0x7e4000a356p0nxp5237%2522%257D%252C%2522clir0x7e4000d356pey2daawr%2522%253A%257B%2522id%2522%253A%2522clir0x7e4000d356pey2daawr%2522%252C%2522activeTabId%2522%253A%2522clir0xcnx00d5356pzbeke2vu%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clir0xbci007s356pcxglvq25%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%252C%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522id%2522%253A%2522clir0xcnx00d5356pzbeke2vu%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Installation

```bash
npm i reactjs-dialog-modal
```

## Props

```ts
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
* const [showModal, setShowModal] = useState<boolean>(false)
*
* const handleClose = () => {
* setShowModal(false)
* }
*
* const ModalChildren = () => {
* return (
* <div className="modal-content">
* <h2>Modal Title</h2>
* <button onClick={handleClose} type="button">Close</button>
* </div>
* );
* }
*
* return (
* <div>
* <button type='button' onClick={() => setShowModal(true}>Open Modal</button>
* <Modal showModal={showModal}>
* <ModalChildren/>
* </Modal>
* </div>
* )
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
* const [showModal, setShowModal] = useState<boolean>(false)
*
* const handleClose = () => {
* setShowModal(false)
* }
*
* const ModalChildren = () => {
* return (
* <div className="modal-content">
* <h2>Modal Title</h2>
* <button onClick={handleClose} type="button">Close</button>
* </div>
* );
* }
*
* return (
* <div>
* <button type='button' onClick={() => setShowModal(true}>Open Modal</button>
* <Modal showModal={showModal}>
* <ModalChildren/>
* </Modal>
* </div>
* )
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
* console.log("Modal closed with value: ", e.target.returnValue)
* setShowModal(false)
* }
*
* @see <https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue>
   */
  returnValue?: string
  /**
* @description
* The onClose prop accepts an event handler that is called when the user closes the modal.
*
* @example
* const onModalClose = () => {
* //do something after the modal closes//
* console.log("The modal was closed")
* }
*
* <Modal onClose={onModalClose} showModal={showModal}>
* <ModalChildren/>
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
* //Optional, fires after onModalCancel (if onModalCancel is present)
* const onModalClose = () => {
* console.log("The modal was closed")
* }
*
* //Optional, fires before onModalClose (if onModalClose is present)
* const onModalCancel = () => {
* console.log("The escape key was pressed")
* }
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
* @see <https://developer.mozilla.org/en-US/docs/Web/CSS/:modal>
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
* @see <https://developer.mozilla.org/en-US/docs/Web/CSS/:modal>
* for information about the :modal CSS pseudo-class
   */
  style?: CSSProperties
  /**
* @example
* { 'aria-label': 'My dialog',
* 'aria-labelled-by': 'dialogTitle',
* 'aria-described-by': 'dialogDescription' }
   */
  ariaAttributes?: { [key: string]: string }
  /**
* @example
* { 'data-id': 'test-dialog', 'data-number': '123' }
   */
  dataAttributes?: { [key: string]: string }
  /**
* @see <https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang>
* for more information about the lang attribute and language codes
   */
  lang?: string
  /**
* @see <https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate>
   */
  translate?: "yes" | "no"
  /**
* @see <https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir>
* for more information about the dir attribute
   */
  dir?: "ltr" | "rtl" | "auto"
  /**
* @hint It is unlikely that you will need to use the key prop, but just in case...
* @see <https://react.dev/reference/react/useState#resetting-state-with-a-key>
* @see <https://react.dev/learn/rendering-lists#rules-of-keys>
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
* /@keyframes fadein {
* from { opacity: 0; }
* to { opacity: 1; }
* }
*
* /@keyframes fadeout {
* from { opacity: 1; }
* to { opacity: 0; }
* }
   */
  animateClass?: string
  /**
* @see <https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot>
* for more information about the slot attribute
   */
  slot?: string
}```
