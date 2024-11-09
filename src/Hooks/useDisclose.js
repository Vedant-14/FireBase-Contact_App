import { useState } from "react";

const useDisclose = () => {

    const [isOpen,setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  return {isOpen,toggleModal};
}

export default useDisclose;