// import DataTable from 'react-data-table-component';
// import React, { useState } from 'react';
// import OpenModal from 'ui-component/common/OpenModal';
// import AddEditModal from './addEditModal';
// import '../../../../assets/style/style.css';
// // import TableRows from 'ui-component/Table/TableRows';
// import { IconButton } from '@mui/material';
// import { Visibility, Delete } from '@mui/icons-material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import CardHead from 'ui-component/common/CardHead';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import DeleteModal from 'ui-component/Modals/DeleteModal';
// import ViewModal from './viewModal';
// import '../../../../assets/style/style.css';

// import { getState, deleteState } from 'module/admin/container/stateContainer/slice';

// export default function Index() {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalComponent, setModalComponent] = useState(null);
//   const [modalHeading, setModalHeading] = useState('');
//   const [tableHeading, setTableHeading] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedId, setSelectedId] = useState();
//   const [filteredData, setFilteredData] = useState([]);

//   const modalStyle = { width: '60%' };
//   const dispatch = useDispatch();
//   const stateDetails = useSelector((state) => state.datas.state.stateData);

//   console.log('=========state details', stateDetails);
//   useEffect(() => {
//     dispatch(getState({}));
//     setTableHeading('STATES');
//   }, [dispatch]);

//   const handleOpenModal = (whichOpen, item) => {
//     setOpenModal(true);
//     let ComponentToRender;
//     switch (whichOpen) {
//       case 'addform':
//         setModalHeading('Add State');
//         ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'editform':
//         setModalHeading('Edit State');
//         ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'viewform':
//         setModalHeading('View State');
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
//   };

//   const handleDeleteModal = (item) => {
//     setShowDeleteModal(true);
//     setSelectedId(item.id);
//   };

//   const deleteReferenceConfirm = () => {
//     dispatch(deleteState(selectedId));
//     setShowDeleteModal(false);
//     dispatch(getState());
//   };

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filteredData = stateDetails.rows.filter((row) => {
//       return (
//         row.name.toLowerCase().includes(searchValue) ||
//        row.code.toLowerCase().includes(searchValue)
     
//       );
//     });
//     setFilteredData(filteredData); // Update the filtered data state
//   };
//   const dataToDisplay = filteredData.length > 0 ? filteredData : stateDetails.rows;

//   const columns = [
//     {
//       name: 'code',
//       selector: (row) => row.code
//     },
//     {
//       name: 'Name',
//       selector: (row) => row.name
//     },


//     {
//       name: 'ACTIONS',
//       cell: (row) => (
//         <div>
//           <IconButton onClick={() => handleOpenModal('viewform', row)}>
//             <Visibility className="actn-icon1" style={{ color: 'blue' }} /> {/* Example: blue color */}
//           </IconButton>
//           <IconButton onClick={() => handleOpenModal('editform', row)}>
//             <EditNoteIcon className="actn-icon2" style={{ color: 'green' }} /> {/* Example: green color */}
//           </IconButton>
//           <IconButton onClick={() => handleDeleteModal(row)}>
//             <Delete className="actn-icon3" style={{ color: 'red' }} /> {/* Example: red color */}
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
//       pagination
//       paginationPerPage={6}
//       paginationRowsPerPageOptions={[10, 20, 30]}
//       subHeaderComponent={
//         <div>
//           <CardHead tableHeading={tableHeading} handleAddModal={() => handleOpenModal('addform')}    searchHandler={handleSearch} />
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


import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { tableCustomStyles } from '../tableStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import CardHead from 'ui-component/common/CardHead';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal';
import '../../../../assets/style/style.css';
import { getState, deleteState } from 'module/admin/container/stateContainer/slice';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  // const [filteredData, setFilteredData] = useState([]);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const stateDetails = useSelector((state) => state.adminReducer.state.stateData);

  useEffect(() => {
    dispatch(getState({}));
    setTableHeading('STATES');
  }, [dispatch]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add State');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit State');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View State');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    setShowDeleteModal(false);
    if (formtype === 'addform') setPage(1);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteState(selectedId));
    setShowDeleteModal(false);
    dispatch(getState());
  };

  // const handleSearch = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   const filteredData = stateDetails.rows.filter((row) => {
  //     return (
  //       row.name.toLowerCase().includes(searchValue) ||
  //       row.code.toLowerCase().includes(searchValue)
  //     );
  //   });
  //   setFilteredData(filteredData); // Update the filtered data state
  // };

  // const dataToDisplay = filteredData.length > 0 ? filteredData : stateDetails.rows;

  const columns = [
    {
      name: 'NAME',
      selector: (row) => row.name
    },
    {
      name: 'CODE',
      selector: (row) => row.code
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" style={{ color: 'blue' }} /> {/* Example: blue color */}
          </IconButton>
          <IconButton onClick={() => handleOpenModal('editform', row)}>
            <EditNoteIcon className="actn-icon2" style={{ color: 'green' }} /> {/* Example: green color */}
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" style={{ color: 'red' }} /> {/* Example: red color */}
          </IconButton>
        </div>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={stateDetails.rows}
      // striped
      highlightOnHover
      pointerOnHover
      subHeader
      pagination
      paginationPerPage={6}
      customStyles={tableCustomStyles}
      paginationRowsPerPageOptions={[10, 20, 30]}
      subHeaderComponent={
        <div>
          {/* <CardHead tableHeading={tableHeading} handleAddModal={() => handleOpenModal('addform')}    searchHandler={handleSearch} /> */}
          <CardHead tableHeading={tableHeading} handleAddModal={() => handleOpenModal('addform')}  />

          {openModal && (
            <OpenModal
              open={openModal}
              handleClose={handleCloseModal}
              component={modalComponent}
              mdlwidth={modalStyle.width}
              mdlHeading={modalHeading}
            />
          )}

          {showDeleteModal && (
            <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
          )}
        </div>
      }
    />
  );
}
