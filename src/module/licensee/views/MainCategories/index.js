// import DataTable from 'react-data-table-component';
// import React, { useState } from 'react';
// import OpenModal from 'ui-component/common/OpenModal';
// import AddEditModal from './addEditModal';

// // import TableRows from 'ui-component/Table/TableRows';
// import { IconButton } from '@mui/material';
// import { Visibility, Delete } from '@mui/icons-material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import CardHead from 'ui-component/common/CardHead';
// import { useDispatch, useSelector } from 'react-redux';
// import { tableCustomStyles } from '../tableStyle.jsx';
// import { useEffect } from 'react';
// import '../../../../assets/style/style.css'
// import DeleteModal from 'ui-component/Modals/DeleteModal';
// import ViewModal from './viewModal';


// import { getMainCategory, deleteMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';

// export default function Index() {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalComponent, setModalComponent] = useState(null);
//   const [count, setCount] = useState('');
//   const [modalHeading, setModalHeading] = useState('');
//   const [tableHeading, setTableHeading] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedId, setSelectedId] = useState();
//   const dataval = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData.count)
//   const [filteredData, setFilteredData] = useState([]);

//   const modalStyle = { width: '60%' };
//   const dispatch = useDispatch();
//   const mainCategoryDetails = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);

//   console.log('=========mainCategoryDetails', mainCategoryDetails);
//   useEffect(() => {
//     dispatch(getMainCategory({}));
//     setTableHeading('MAIN CATEGORY');
//     setCount(Number(dataval));
//   }, [dispatch]);

//   const handleOpenModal = (whichOpen, item) => {
//     setOpenModal(true);
//     let ComponentToRender;
//     switch (whichOpen) {
//       case 'addform':
//         setModalHeading('Add MainCategory');
//         ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'editform':
//         setModalHeading('Edit MainCategory');
//         ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'viewform':
//         setModalHeading('View MainCategory');
//         ComponentToRender = <ViewModal data={item} />;
//         break;
//       default:
//         ComponentToRender = null;
//     }
//     setModalComponent(ComponentToRender);
//   };

//   const handleCloseModal = (formtype) => {
//     setOpenModal(false);
//     setShowDeleteModal(false);
//     if (formtype === 'addform') setPage(1);
//     dispatch(getMainCategory());
//   };

//   const handleDeleteModal = (item) => {
//     setShowDeleteModal(true);
//     setSelectedId(item.id);
//   };

//   const deleteReferenceConfirm = () => {
//     dispatch(deleteMainCategory(selectedId));
//     setShowDeleteModal(false);
//     dispatch(getMainCategory());
//   };

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filteredData = mainCategoryDetails.rows.filter((row) => {
//       return (row.mainCategory.toLowerCase().includes(searchValue) || row.desc.toLowerCase().includes(searchValue))
//     });
//     setFilteredData(filteredData); // Update the filtered data state
//   };
//   const dataToDisplay = filteredData.length > 0 ? filteredData : mainCategoryDetails.rows;

//   const columns = [
//     {
//       name: 'MAIN CATEGORY',
//       selector: (row) => row.grpCatgName
//     },
//     {
//       name: 'DESCRIPTION',
//       selector: (row) => {
//         if(row.grpCatgDescp.length > 20) {
//           return row.grpCatgDescp.substring(0,20) + '....'
//         }
//         return row.grpCatgDescp
//       }
//     },
//     {
//       name: 'STATUS',
//       selector: (row) => (row.isActive ? 'true' : 'false') // Assuming isActive is a boolean
//     },

//     {
//       name: 'ACTIONS',
//       cell: (row) => (
//         <div>
//           <IconButton onClick={() => handleOpenModal('viewform', row)}>
//             <Visibility className="actn-icon1"  /> 
//           </IconButton>
//           <IconButton onClick={() => handleOpenModal('editform', row)}>
//             <EditNoteIcon className="actn-icon2"  /> 
//           </IconButton>
//           <IconButton onClick={() => handleDeleteModal(row)}>
//             <Delete className="actn-icon3"  />
//           </IconButton>
//         </div>
//       )
//     }
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={dataToDisplay}
//       // striped
//       highlightOnHover
//       pointerOnHover
//       subHeader
//       customStyles={tableCustomStyles}
//       pagination
//       paginationPerPage={6}
//       paginationRowsPerPageOptions={[10, 20, 30]}
//       subHeaderComponent={
//         <div>
//           <CardHead
//             tableHeading={tableHeading}
//             handleAddModal={() => handleOpenModal('addform')}
//             mainCategoryDetails={mainCategoryDetails}
//             searchHandler={handleSearch}
//             count={count}
//           />
//           {openModal && (
//             <OpenModal
//               open={openModal}
//               handleClose={handleCloseModal}
//               component={modalComponent}
//               mdlwidth={modalStyle.width}
//               mdlHeading={modalHeading}
//             />
//           )}

//           {showDeleteModal && (
//             <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
//           )}
//         </div>
//       }
//     />
//   );
// }
