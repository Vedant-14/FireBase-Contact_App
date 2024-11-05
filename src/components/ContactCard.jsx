import {HiOutlineUserCircle} from 'react-icons/hi';
import {MdEdit,MdDeleteForever} from 'react-icons/md';
const ContactCard = ({id,name,email}) => {
  return (
    
      <div
        key={id}
        className="bg-yellow flex gap-1 justify-between items-center p-2 rounded-lg"
      >
        <div className="flex items-center gap-1 ">
          <HiOutlineUserCircle className="text-4xl" />
          <div className="">
            <h2 className="font-medium">{name}</h2>
            <p className="text-sm">{email}</p>
          </div>
        </div>
        <div className="flex gap-2 cursor-pointer text-3xl">
          <MdEdit className="" />
          <MdDeleteForever />
        </div>
      </div>
    
  );
};

export default ContactCard;
