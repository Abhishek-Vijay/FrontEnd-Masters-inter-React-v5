// MutableRefObject, ReactElement is for typeScript
import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) =>{
    const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    if(!elRef.current){
        // erRef.current is always going to be same div that we created here and it's going to create this div only once. we will get same div on every re-render 
        elRef.current = document.createElement('div')
    }

    useEffect(()=>{
        const modalRoot = document.getElementById('modal');
        if(!modalRoot || !elRef.current){
            return;
        }
        modalRoot.appendChild(elRef.current);
        // to close modal after 'Yes' or 'No' selection. this returned function here acts like componentWillUnmount()
        // to remove somthing from DOM, to remove event Listeners, to stop timer, to cancel setTimeout or setInterval, to clean up anything
        return () =>{
            if(elRef.current)
            modalRoot.removeChild(elRef.current);
        }
    },[]);

    // we can direct put children in createPortal without div but here css classes need this that's why we are putting it in div.
    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;