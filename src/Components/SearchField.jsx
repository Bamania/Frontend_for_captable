import React, { useState } from 'react'
import AddEmployee from './AddEmployee.jsx';

const SearchField = () => {
    const [open, setOpen] = useState(false);
    const handleClose=()=>{
        setOpen(false);
    };
    const handleClick = () => {
      setOpen(true);
    };
  return (
    <div className='border-b'>
                    <div className=" mx-[10px] flex mt-[5px] justify-between  items-center  w-[full] h-[80px]  ">
                        <div className=''>
                        <form action="POST" >
                            <label htmlFor="search" className="relative">
                                <input
                                    id="search"
                                    className="ml-2 font-source-code-pro border-[#76787A] bg-[#F4F4F4] w-[400px] h-[40px] mr-[10px] rounded-[12px] pl-[30px] placeholder-gray-400"
                                    type="text"
                                    placeholder="Search using Keyword"
                                />
                                <svg
                                    className="absolute left-3 top-[50%] transform -translate-y-1/2 w-5 h-5 fill-current text-gray-400"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.9167 9.66667H10.2584L10.025 9.44167C11.025 8.275 11.5417 6.68334 11.2584 4.99167C10.8667 2.675 8.93337 0.825003 6.60003 0.541669C3.07503 0.108336 0.108366 3.075 0.5417 6.6C0.825033 8.93334 2.67503 10.8667 4.9917 11.2583C6.68337 11.5417 8.27503 11.025 9.4417 10.025L9.6667 10.2583V10.9167L13.2084 14.4583C13.55 14.8 14.1084 14.8 14.45 14.4583C14.7917 14.1167 14.7917 13.5583 14.45 13.2167L10.9167 9.66667ZM5.9167 9.66667C3.8417 9.66667 2.1667 7.99167 2.1667 5.91667C2.1667 3.84167 3.8417 2.16667 5.9167 2.16667C7.9917 2.16667 9.6667 3.84167 9.6667 5.91667C9.6667 7.99167 7.9917 9.66667 5.9167 9.66667Z"
                                        fill="#AFAFB1"
                                    />
                                </svg>
                            </label>

                        </form>
                        </div>
                        <div className='flex gap-5'>
                            <button onClick={handleClick} className='w-[161px] focus:ring-4  transform active:scale-75 transition-transform font-medium text-[#3A74F2]  h-[40px] border rounded-[12px] border-[#3A74F2] font-source-code-pro '>
                                Add Employee
                            </button>
                            {open && <AddEmployee onClose={handleClose} />}
                            <button className=" w-[161px] focus:ring-4  transform active:scale-75 transition-transform font-medium font-source-code-pro text-[#3A74F2] justify-center h-[40px] border rounded-[12px] border-[#3A74F2] flex gap-2 items-center mr-[10px]">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 12.175L3.175 7.35L4.25 6.275L7.25 9.275V0H8.75V9.275L11.75 6.275L12.825 7.35L8 12.175ZM1.5 16C1.1 16 0.75 15.85 0.45 15.55C0.15 15.25 0 14.9 0 14.5V10.925H1.5V14.5H14.5V10.925H16V14.5C16 14.9 15.85 15.25 15.55 15.55C15.25 15.85 14.9 16 14.5 16H1.5Z"
                                        fill="#2B5A9D"
                                    />
                                </svg>
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>
  )
}

export default SearchField