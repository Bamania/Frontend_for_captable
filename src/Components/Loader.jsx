import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="flex items-center justify-center h-screen">
    <div class="relative">
        <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
    </div>
</div>
    </div>
  );
};

export default Loader;

// import React from 'react';

// const Loader = () => {
//   return (
//     <div className="flex items-center justify-center  bg-gray-800 bg-opacity-75 z-50 h-screen w-screen">
//       <div class="flex items-center justify-center h-screen">
//     <div class="relative">
//         <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
//         <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
//         </div>
//     </div>
// </div>
//     </div>
//   );
// };

// export default Loader;