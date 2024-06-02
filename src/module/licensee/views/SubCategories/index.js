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


// import { getSubCategory, deleteSubCategory } from 'module/licensee/container/subCategoryContainer/slice';

// export default function Index() {
//   const [openModal, setOpenModal] = useState(false);
//   const [count, setCount] = useState('');
//   const [modalComponent, setModalComponent] = useState(null);
//   const [modalHeading, setModalHeading] = useState('');
//   const [tableHeading, setTableHeading] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedId, setSelectedId] = useState();
//   const [filteredData, setFilteredData] = useState([]);
//   const dataval = useSelector((state) => state.licenseeReducer.subCategory.subCategoryData.count)
//   const modalStyle = { width: '60%' };
//   const dispatch = useDispatch();
//   const subCategoryDetails = useSelector((state) => state.licenseeReducer.subCategory.subCategoryData);

//   console.log('=========SubCategoryDetails', subCategoryDetails);
//   useEffect(() => {
//     dispatch(getSubCategory({}));
//     setCount(Number(dataval));
//     setTableHeading('SUB CATEGORY');
//   }, [dispatch]);

//   const handleOpenModal = (whichOpen, item) => {
//     setOpenModal(true);
//     let ComponentToRender;
//     switch (whichOpen) {
//       case 'addform':
//         setModalHeading('Add SubCategory');
//         ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'editform':
//         setModalHeading('Edit SubCategory');
//         ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'viewform':
//         setModalHeading('View SubCategory');
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
//     dispatch(getSubCategory());
//   };

//   const handleDeleteModal = (item) => {
//     setShowDeleteModal(true);
//     setSelectedId(item.id);
//   };

//   const deleteReferenceConfirm = () => {
//     dispatch(deleteSubCategory(selectedId));
//     setShowDeleteModal(false);
//     dispatch(getSubCategory());
//   };

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filteredData = subCategoryDetails.rows.filter((row) => {
//       return (row.subCategory.toLowerCase().includes(searchValue) || row.desc.toLowerCase().includes(searchValue))
//     });
//     setFilteredData(filteredData); // Update the filtered data state
//   };
//   const dataToDisplay = filteredData.length > 0 ? filteredData : subCategoryDetails.rows;

//   const columns = [
//     {
//       name: 'SUB CATEGORY',
//       selector: (row) => row.subCatgName
//     },
//     {
//       name: 'DESCRIPTION',
//       selector: (row) => {
//         if(row.subCatgDescp.length > 20) {
//           return row.subCatgDescp.substring(0,20) + '....'
//         }
//         return row.subCatgDescp
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
//             subCategoryDetails={subCategoryDetails}
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
