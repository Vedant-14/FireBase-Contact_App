import Modal from "./Modal";
import {Formik,Form,Field} from 'formik';
import {db} from '../config/Firebase';
import {collection,addDoc} from 'firebase/firestore'

const AddAndUpdateContact = ({isOpen,toggleModal}) => {
  const addContacts = async(contact)=> {
      try {
        const contactref = collection(db,'contacts');
        await addDoc(contactref,contact)
      } catch (error) {
          console.log(error);
      }
  }
  return (
    <div>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <Formik
          initialValues={{
            name:'',
            email:'',
          }}
          onSubmit={(values)=> {
            console.log(values);
            addContacts(values);
          }}>
            <Form className="flex flex-col gap-3">
              <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name='name' className='border h-10 p-1'/>
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <Field name='email' className='border h-10 p-1'/>
              </div>
              <button className="bg-orange px-3 py-1.5 border self-end" type='submit'>Add Contact</button>
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