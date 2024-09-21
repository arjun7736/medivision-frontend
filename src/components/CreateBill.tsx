import { forwardRef, useState } from "react";
import { Button } from "./ui/button";
import BillForm from "./BillForm";

const CreateBill = forwardRef<HTMLButtonElement>((_,ref) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      ref={ref}
        className="bg-black hidden text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-lg"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    New Bill
                  </h3>
                  <Button>+ add Product</Button>
                </div>
                <div className="relative p-6 flex-auto ">
                  <BillForm/>
                  <BillForm/>
                  <BillForm/>
                </div>
                <div className="flex items-center gap-5 justify-end p-6 rounded-b">
                  <p className="cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </p>
                  <Button
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save 
                  </Button>
                </div>
              </div>
            </div>
          </div>
          </>
      ) : null}
    </>
  );
});

export default CreateBill;