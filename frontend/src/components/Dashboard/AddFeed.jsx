import React, {useState} from "react";
import { XCircleIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import Datepicker from "../DatePicker/Datepicker";
import * as Yup from 'yup';
import {addFeedsService} from "../../services/dashboardService";

function AddFeed({ setShowModal, activeFeed, getFeedsCallback }){
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const addFeedsData = async (data) => {
    const response = await addFeedsService(data);
    if(response.key === "success"){
      getFeedsCallback();
      setShowModal(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      store_id: "",
      sku: "",
      product_name: "",
      price: "",
    },
    validationSchema: Yup.object({
      store_id: Yup.string().required("Required"),
      sku: Yup.string().required("Required"),
      product_name: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
    }),
    onSubmit: values => {
      values.date = new Date(selectedDate).toISOString();
      if(selectedDate){
        addFeedsData(values);
      }
    },
  });

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none min-width-pp">
            
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Add Feed
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
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store_id">
                    Store
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    name="store_id" type="text" placeholder="Store" 
                    onChange={formik.handleChange} 
                    value={formik.values.store_id} />
                  <p className="text-red-500 text-xs italic mt-1">{formik.errors.store_id}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
                    SKU
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    name="sku" type="text" placeholder="SKU" 
                    onChange={formik.handleChange} 
                    value={formik.values.sku} />
                  <p className="text-red-500 text-xs italic mt-1">{formik.errors.sku}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_name">
                    Product Name
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    name="product_name" type="text" placeholder="Product Name" 
                    onChange={formik.handleChange} 
                    value={formik.values.product_name} />
                  <p className="text-red-500 text-xs italic mt-1">{formik.errors.product_name}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    name="price" type="text" placeholder="Price" 
                    onChange={formik.handleChange} 
                    value={formik.values.price} />
                  <p className="text-red-500 text-xs italic mt-1">{formik.errors.price}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date
                  </label>
                  <Datepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  <p className="text-red-500 text-xs italic mt-1"></p>
                </div>

                <div className="flex items-center justify-center">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                    Submit
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default AddFeed;
