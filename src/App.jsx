import NavBar from './components/NavBar';
import {IoIosSearch} from 'react-icons/io';
import {useState,useEffect} from 'react';
import {collection , getDocs} from 'firebase/firestore';
import {db} from './config/Firebase';
import {HiOutlineUserCircle} from 'react-icons/hi';
import {MdDeleteForever,MdEdit} from 'react-icons/md';
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import AddAndUpdateContact from './components/AddAndUpdateContact';
const App = () => {

  const [contacts,setContacts] = useState([]);
  const [isOpen,setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  useEffect(()=>{
    // This is the block like static in java which executes at first means start of the program only 
    const getContacts = async() => {
      try {
        const contactsRef = collection(db,"contacts"); // We can assume that contacsRef have database which we gonna use is store in it .
        const contactSnapshot = await getDocs(contactsRef);
        console.log(contactSnapshot);
        const contactsList = contactSnapshot.docs.map((doc)=> {
          return {
            id:doc.id, 
            ...doc.data(),
          };
        }
          
        );
        // console.log(contactsList);
        setContacts(contactsList);
      } catch (error) {
          console.log(error);
      }
    }
    getContacts();
  },[]);
  
  return (
    <>
    <div className='max-w-[370px] mx-auto px-4 h-[852px] '>
      <NavBar></NavBar>
      <div className="flex gap-3 relative items-center">
        <IoIosSearch className='text-white text-3xl absolute ml-1' />
        <input type="text" placeholder="Search Contact" className="border border-white bg-transparent rounded-md p-1 h-10 flex-grow text-white pl-9 "></input>
        <img src="/images/PlusIcon.png" alt="Plusimage" className='cursor-pointer' onClick={toggleModal}/>
        </div>

      {/* <div className='text-white flex justify-center align-center pt-[300px] '>
         <img src="/images/Hands Contact.png" alt="" />
          <h1 className='p-3'>No Contact Found</h1>
      </div> */}

      <div className='pt-3 flex flex-col gap-2'>
        {
          contacts.map((contact)=> (
            <ContactCard key = {contact.id} id = {contact.id} name={contact.name} email={contact.email}/>
          ))
        }
      </div>
    </div> 
    <AddAndUpdateContact isOpen={isOpen} toggleModal={toggleModal}/>
    </>
  )
}

export default App; 