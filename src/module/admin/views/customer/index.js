// import React from 'react';
// import DataTable from 'react-data-table-component';

// export default function Index() {
//   const data = [
//     { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
//   ];

//   const columns = [
//     {
//       name: 'ID',
//       selector: 'id',
//       sortable: true,
//     },
//     {
//       name: 'Name',
//       selector: 'name',
//       sortable: true,
//     },
//     {
//       name: 'Age',
//       selector: 'age',
//       sortable: true,
//     },
//     {
//       name: 'Email',
//       selector: 'email',
//       sortable: true,
//     },
//   ];

//   return (
//     <div>
//       <h1>Hello</h1>
//       <DataTable columns ={columns} data={data} />
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function Index() {
 

  // Define columns
  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
  ];

  

  return (
    <div>
      <h1>Customer</h1>
      <DataTable columns={columns}/>
    </div>
  );
}
