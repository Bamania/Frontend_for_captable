import React from 'react'

const ActualDashboard = () => {
  return (
    <div className=' flex mt-[20px] mx-[20px] rounded-lg    bg-[#F4F4F4]'>

                    <div className=' flex items-center p-5 text-[13px] justify-center w-[280px] h-[44px] font-source-code-pro'>
                        Stakeholder
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14L5 11L5.73333 10.2667L8 12.5333L10.2667 10.2667L11 11L8 14ZM5.73333 5.79998L5 5.06665L8 2.06665L11 5.06665L10.2667 5.79998L8 3.53332L5.73333 5.79998Z" fill="#76787A" />
                        </svg>
                    </div>

                    <div className=' flex items-center p-5 justify-center text-[13px] w-[280px] h-[44px] font-source-code-pro'>
                        Total Allocation
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14L5 11L5.73333 10.2667L8 12.5333L10.2667 10.2667L11 11L8 14ZM5.73333 5.79998L5 5.06665L8 2.06665L11 5.06665L10.2667 5.79998L8 3.53332L5.73333 5.79998Z" fill="#76787A" />
                        </svg>
                    </div>

                    <div className=' flex items-center p-5 justify-center text-[13px] w-[280px] h-[44px] font-source-code-pro'>
                        Unlocked Token
                    </div>

                    <div className=' flex items-center p-5  justify-center  text-[13px] w-[280px] h-[44px] font-source-code-pro'>
                        Claimed
                    </div>

                    <div className=' flex items-center p-5 justify-center text-[13px] w-[280px] h-[44px] font-source-code-pro'>
                        Wallet
                    </div>

                    <div className=' flex items-center  p-5 justify-center  text-[13px] w-[280px] h-[44px] font-source-code-pro'>
                        Status
                    </div>

                </div>
  )
}

export default ActualDashboard