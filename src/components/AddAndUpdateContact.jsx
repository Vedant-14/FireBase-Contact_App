import Modal from "./Modal";
import {Formik,Form,Field, ErrorMessage} from 'formik';
import {db} from '../config/Firebase';
import {collection,addDoc,deleteDoc, updateDoc, doc} from 'firebase/firestore'
import { toast } from "react-toastify";
import * as Yup from 'yup';

const AddAndUpdateContact = ({isOpen,toggleModal,isUpdate,contact}) => {

  const contactsValidationSchema = Yup.object().shape({
    name:Yup.string("Name should be String").required("Name should not be Empty"),
    email:Yup.string().email("Invlid Email").required("Email is required")
  })
  const addContacts = async(contact)=> {
      try {
        const contactref = collection(db,'contacts');
        await addDoc(contactref,contact);
        toggleModal();
        toast.success(contact.name+"'s Contact Added "+"Successfully");
      } catch (error) { 
          console.log(error);
      }
  }
  const updateContacts = async(values)=> {
    try {
        const docRef = doc(db,"contacts",contact.id);
        await updateDoc(docRef,values);
        toggleModal();
        toast.success(contact.name+"'s Contact "+"Updated!");
    }
    catch(error) {
      console.log(error);
    }
  }
  return (
    <div>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <Formik
          validationSchema={contactsValidationSchema}
          initialValues={isUpdate?{
            name:contact.name,
            email:contact.email
          }:{
            name:'',
            email:'',
          }}
          onSubmit={(values)=> {
            console.log(values);
            isUpdate?updateContacts(values):addContacts(values);
          }}>
            <Form className="flex flex-col gap-3">
              <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name='name' className='border h-10 p-1' />
                <div className="text-red-500 text-xs">
                  <ErrorMessage name='name'/>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <Field name='email' className='border h-10 p-1' />
                <div className="text-red-500 text-xs">
                  <ErrorMessage name='email'/>
                </div>
              </div>
              <button className="bg-orange px-3 py-1.5 border self-end" type='submit'>{isUpdate?"Update":"Add"} Contact</button>
            </Form>
          </Formik>
    </Modal>
    </div>
  )
}

export default AddAndUpdateContact;




{/* <div className="flex flex-col gap-3 ">
                        <div>
                            <label htmlFor="Name">Name</label>
                            <input type='text' placeholder="" className="border rounded-md p-2" required/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type='email' placeholder="" className="border rounded-md p-2" required/>
                        </div>
                        <button className='p-1 bg-orange border rounded-md' onClick=''>Add Contact</button>
                </div> */}