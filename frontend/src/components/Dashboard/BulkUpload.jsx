import React, {useState} from "react";
import { XCircleIcon, CloudUploadIcon } from '@heroicons/react/solid';
import {bulkUploadFeedsService} from "../../services/dashboardService";

function BulkUpload({setShowModal, getFeedsCallback}) {
  const [file, setFile] = useState();

  const bulkUploadFeedsData = async (data) => {
    const response = await bulkUploadFeedsService(data);
    if(response.key === "success"){
      getFeedsCallback();
      setShowModal(false);
    }
  }

  const handleChangeFileIp = (e) => {
    const [f] = e.target.files;
    setFile(f);
  };

  const bulkUploadSubmit = () => {
    const formData = new FormData();
    formData['file'] = file;
    console.log(formData);
    bulkUploadFeedsData(formData);
  }

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none min-width-pp">
            
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Bulk Upload Feed
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
            <div className="flex justify-center items-center w-full">
              <label htmlFor="file" className="flex flex-col justify-center items-center w-full 
              h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <CloudUploadIcon className="h-7 w-7" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 ">Only CSV's</p>
                </div>
                <input id="file" type="file" className="hidden" accept=".csv" onChange={handleChangeFileIp} multiple={false} />
              </label>
            </div> 
            <div className="w-full justify-center flex pt-2 mt-3">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                rounded focus:outline-none focus:shadow-outline" 
                type="button" onClick={() => bulkUploadSubmit()}>
                Submit
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default BulkUpload;
