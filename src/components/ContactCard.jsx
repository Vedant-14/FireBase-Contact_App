import {HiOutlineUserCircle} from 'react-icons/hi';
import {MdEdit,MdDeleteForever} from 'react-icons/md';
import {db} from '../config/Firebase';
import {deleteDoc,doc,addDoc,updateDoc} from 'firebase/firestore';
import AddAndUpdateContact from './AddAndUpdateContact';
import { useState } from 'react';
import useDisclose from '../Hooks/useDisclose';
import { toast } from 'react-toastify';

// import AddAndUpdateContact from './AddAndUpdateContact';

const ContactCard = ({contact}) => {
  const {isOpen,toggleModal} = useDisclose();

const deleteContact = async (id)=> {
  try {
    toast.success("Contact Deleted Succssfully");
    await deleteDoc(doc(db,"contacts",id));
  }
  catch(error) {
    console.log(error);
  }
}
const updateContact = ()=> {
  toggleModal();
}
  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex gap-1 justify-between items-center p-2 rounded-lg"
      >
        <div className="flex items-center gap-1 ">
          <HiOutlineUserCircle className="text-4xl" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-2 cursor-pointer text-3xl">
          <MdEdit className="" onClick={updateContact} />
          <MdDeleteForever onClick={()=>deleteContact(contact.id)}data-id={contact.id} className='delete-button' />
        </div>
      </div>
    
  );
};

export default ContactCard;
