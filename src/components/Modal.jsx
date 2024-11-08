import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
const Modal = ({toggleModal,isOpen,children}) => {
  return createPortal(
    <>
    {isOpen && 
    <>
       <div className="fixed inset-0  bg-white p-4 h-[250px] w-[244px] m-auto z-50">
        <div className='flex justify-end'>
            <AiOutlineClose  className='text-3xl cursor-pointer place-self-end' onClick={toggleModal}/>
        </div>
        {children}
    </div> 
    <div className='absolute h-screen w-screen backdrop-blur top-0 z-40' onClick={toggleModal}/>
    </>
    }
    </>
  ,document.getElementById("modal-root"))
}

export default Modal;




{/* {isOpen && <div className=" bg-white p-4 w-[348px]">
        <div className="mw-[316px] jusitfy-end ">
        <div className="flex flex-col ">
            <label htmlFor="Name">Name</label>
            <input type="text" className='border p-1'/>
        </div>
        <div className="flex flex-col pb-1 ">
            <label htmlFor="Email">Email</label>
            <input type="text" className='border p-1'/>
        </div>
        <button className="cursor-pointer bg-orange border rounded-md p-1 text-sm">Add Contact</button>
        </div>
    </div>} */}