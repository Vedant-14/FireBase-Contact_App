import NavBar from './components/NavBar';
import {IoIosSearch} from 'react-icons/io';
import {useState,useEffect} from 'react';
import {collection , getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/Firebase';
import {HiOutlineUserCircle} from 'react-icons/hi';
import {MdDeleteForever,MdEdit} from 'react-icons/md';
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './Hooks/useDisclose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

   const [contacts,setContacts] = useState([]);
   const {isOpen,toggleModal} = useDisclose();
   const [filteredContacts,setFilteredContacts] = useState(contacts);

  
  useEffect(()=>{
    // This is the block like static in java which executes at first means start of the program only 
    const getContacts = async() => {
      try {
        const contactsRef = collection(db,"contacts");
        const contactSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef,(snapShot)=>{
          // console.log(contactSnapshot);
          const contactsList = snapShot.docs.map((doc)=> {
            return {
              id:doc.id, 
              ...doc.data(),
            };  
          }
          );
          // console.log(contactsList);
          setContacts(contactsList);
          setFilteredContacts(contactsList);
          return contactsList;

        })
         // We can assume that contacsRef have database which we gonna use is store in it .
        
       
      } catch (error) {
          console.log(error);
      }
    }
    getContacts();
  },[]);

  const searchContact  = (event)=> {
    console.log(event.target.value);
    const searchedText = event.target.value;
    if(searchedText==='') {
      setFilteredContacts(contacts);
    }
    // filter method on array creates new array with those elemetns which pass the below condition given in the function 
    const filterContacts = contacts?.filter((contact)=> contact.name.toLowerCase().includes(searchedText.toLowerCase()) ||  contact.email.toLowerCase().includes(searchedText.toLowerCase())
    );
    console.log(filterContacts);
    setFilteredContacts(filterContacts);
    
  }
  
  return (
    <>
    <div className='max-w-[370px] mx-auto px-4 h-[852px] '>
      <NavBar></NavBar>
      <div className="flex gap-3 relative items-center">
        <IoIosSearch className='text-white text-3xl absolute ml-1' />
        <input type="text" onChange={()=> searchContact(event)} placeholder="Search Contact" className="border border-white bg-transparent rounded-md p-1 h-10 flex-grow text-white pl-9"/>
        <img src="/images/PlusIcon.png" alt="Plusimage" className='cursor-pointer' onClick={toggleModal}/>
        </div>

      {/* {!filteredContacts}<div className='text-white flex justify-center align-center pt-[300px] '>
         <img src="/images/Hands Contact.png" alt="" />
          <h1 className='p-3'>No Contact Found</h1>
      </div>  */}

      <div className='pt-3 flex flex-col gap-2'>
        {
          filteredContacts.map((contact)=> (
            <ContactCard key = {contact.id} contact={contact} isOpen={isOpen} toggleModal={toggleModal} />
          ))
        }
      </div>
    </div> 
    <AddAndUpdateContact isUpdate={false} isOpen={isOpen} toggleModal={toggleModal}/>
    <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App;
 