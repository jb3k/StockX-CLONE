import React, { useRef, useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import './Modal.css';

export const ShoeContext = React.createContext();

export function ShoeProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  const [shoeListing, setShoeListing] = useState(0)

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ShoeContext.Provider value={{
        value,
        shoeListing, setShoeListing
      }}>
        {children}
      </ShoeContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


// export function Modal({ onClose, children }) {
//   const modalNode = useContext(ModalContext);
//   if (!modalNode) return null;

//   return ReactDOM.createPortal(
//     <div id="modal">
//       <div id="modal-background" onClick={onClose} />
//       <div id="modal-content">
//         {children}
//       </div>
//     </div>,
//     modalNode
//   );
// }
