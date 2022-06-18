import React from "react";
import { XCircleIcon } from '@heroicons/react/solid';

function ViewFeed({ setShowModal, activeFeed }){
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none min-width-pp">
            
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                View Feed
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
              <div className="flex w-full mb-2">
                <div className="w-1/3">Date</div>
                <div className="w-2/3">{activeFeed.date}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ViewFeed;
