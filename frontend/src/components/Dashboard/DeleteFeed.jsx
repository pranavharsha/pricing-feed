import React from "react";
import { XCircleIcon } from '@heroicons/react/solid';
import {deleteFeedsService} from "../../services/dashboardService";

function DeleteFeed({ setShowModal, activeFeed, getFeedsCallback }){
  const deleteFeedsData = async (id) => {
    const response = await deleteFeedsService(id);
    if(response.key === "success"){
      getFeedsCallback();
      setShowModal(false);
    }
  }

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none min-width-pp">
            
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Are you sure to delete below feed ?
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <XCircleIcon className="h-7 w-7" />
                </span>
              </button>
            </div>

            <div className="relative p-6 flex-auto leading-relaxed">
              <div className="flex w-full mb-2">
                <div className="w-1/3">Store ID</div>
                <div className="w-2/3">{activeFeed.store_id}</div>
              </div>
              <div className="flex w-full mb-2">
                <div className="w-1/3">SKU</div>
                <div className="w-2/3">{activeFeed.sku}</div>
              </div>
              <div className="flex w-full mb-2">
                <div className="w-1/3">Product Name</div>
                <div className="w-2/3">{activeFeed.product_name}</div>
              </div>
              <div className="flex w-full mb-2">
                <div className="w-1/3">Price</div>
                <div className="w-2/3">{activeFeed.price}</div>
              </div>
              <div className="flex w-full mb-2 pb-3">
                <div className="w-1/3">Date</div>
                <div className="w-2/3">{activeFeed.date}</div>
              </div>
              <div className="flex w-full mb-2 p-5 justify-center items-center border-t border-solid border-slate-200">
                <div className="w-1/2 justify-center flex pr-2">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button" onClick={() => deleteFeedsData(activeFeed.id)}>
                    Delete
                  </button>
                </div>
                <div className="w-1/2 justify-center flex pl-2">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default DeleteFeed;
