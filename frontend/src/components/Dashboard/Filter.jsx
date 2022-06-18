
import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import { AdjustmentsIcon } from '@heroicons/react/solid';

function FilterButton({searchKey, setSearchKey}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const clearAllFilters = () => {
    setSearchKey("");
  }

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="bg-white flex items-center"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span><wbr />
        <AdjustmentsIcon className="h-7 w-7"/>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="origin-top-right z-10 absolute top-full left-0 right-auto md:left-auto md:right-0 min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Filters</div>
          <div className="px-3 my-1 pb-3">
            <div className="block text-gray-700 text-sm font-bold mb-1">Search Columns</div>
            <input type="text" class="px-2 py-1 w-60 rounded"
              placeholder="Search..." value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />
          </div>
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button 
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600" 
                  onClick={()=>clearAllFilters()}>Clear</button>
              </li>
              <li>
                <button 
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white" 
                  onClick={() => setDropdownOpen(false)} onBlur={() => setDropdownOpen(false)}>Apply</button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default FilterButton;