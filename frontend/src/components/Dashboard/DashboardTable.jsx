import React, {useState, useEffect, useMemo} from 'react';
import {getAllFeedsService} from "../../services/dashboardService";
import { EyeIcon, PencilIcon, TrashIcon, PlusCircleIcon, UploadIcon } from '@heroicons/react/solid';
import moment from 'moment';
import ViewFeed from "./ViewFeed";
import AddFeed from "./AddFeed";
import EditFeed from "./EditFeed";
import DeleteFeed from "./DeleteFeed";
import BulkUpload from "./BulkUpload";
import Pagination from '../Pagination/Pagination';
import Filter from "./Filter";

const PageSize = 10;

function DashboardTable() {
  const [feedsData, setFeedsData] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [activeFeed, setActiveFeed] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bulkUploadModal, setBulkUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");

  const getFeedsData = async () => {
    const response = await getAllFeedsService();
    if(response.key === "success"){
      setFeedsData(response.data);
    }
  }

  const viewFeedModal = (id, feedItem) => {
    setActiveId(id);
    setActiveFeed(feedItem);
    setViewModal(true);
  }

  const editFeedModal = (id, feedItem) => {
    setActiveId(id);
    setActiveFeed(feedItem);
    setEditModal(true);
  }

  const deleteFeedModal = (id, feedItem) => {
    setActiveId(id);
    setActiveFeed(feedItem);
    setDeleteModal(true);
  }

  useEffect(()=>{
    getFeedsData();
  },[]);

  const filteredData =  useMemo(() => {
    const lowerSearhKey = searchKey.toLowerCase();
    return feedsData.filter((itm)=> itm.store_id.toLowerCase().includes(lowerSearhKey) || itm.sku.toLowerCase().includes(lowerSearhKey) || itm.product_name.toLowerCase().includes(lowerSearhKey));
  }, [feedsData, searchKey]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData, searchKey]);

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="flex items-center px-5 py-4 border-b border-slate-100 relative">
        <div className="font-semibold text-slate-800 text-xl mr-6">Pricing Feed Data</div>
        <div className="absolute right-24 mr-3">
          <Filter searchKey={searchKey} setSearchKey={setSearchKey} />
        </div>
        <button type="button" className="absolute right-14 mr-3" onClick={()=>setBulkUploadModal(true)}>
          <UploadIcon className="h-7 w-7"/>
        </button>
        <button type="button" className="absolute right-7" onClick={()=>setAddModal(true)}>
          <PlusCircleIcon className="h-7 w-7"/>
        </button>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Store ID</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">SKU</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Product Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Price</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {
                currentTableData.map((feedItem)=>{
                  return (
                    <tr key={feedItem.id}>
                      <td className="p-2">
                        <div className="text-slate-800">{feedItem.store_id}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{feedItem.sku}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-indigo-500">{feedItem.product_name}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-500">${feedItem.price}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">{moment(feedItem.date).format("MMMM d, YYYY hh:mm A")}</div>
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center items-center">
                          <button type="button" onClick={()=>viewFeedModal(feedItem.id, feedItem)}>
                            <EyeIcon className="h-5 w-5 mr-3"/>
                          </button>
                          <button type="button" onClick={()=>editFeedModal(feedItem.id, feedItem)}>
                            <PencilIcon className="h-5 w-5 mr-3"/>
                          </button>
                          <button type="button" onClick={()=>deleteFeedModal(feedItem.id, feedItem)}>
                            <TrashIcon className="h-5 w-5"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className="flex justify-center mt-3 pt-3 pb-3">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={feedsData.length}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
      {
        viewModal && (
          <ViewFeed setShowModal={setViewModal} activeId={activeId} activeFeed={activeFeed} />
        )
      }
      {
        addModal && (
          <AddFeed setShowModal={setAddModal} activeId={activeId} activeFeed={activeFeed} getFeedsCallback={getFeedsData} />
        )
      }
      {
        editModal && (
          <EditFeed setShowModal={setEditModal} activeId={activeId} activeFeed={activeFeed} getFeedsCallback={getFeedsData} />
        )
      }
      {
        deleteModal && (
          <DeleteFeed setShowModal={setDeleteModal} activeId={activeId} activeFeed={activeFeed} getFeedsCallback={getFeedsData} />
        )
      }
      {
        bulkUploadModal && (
          <BulkUpload setShowModal={setBulkUploadModal} getFeedsCallback={getFeedsData} />
        )
      }
    </div>
  );
}

export default DashboardTable;
