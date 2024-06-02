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
//   const enqSourceDetails = useSelector((state) => state.datas.state.stateData);

//   console.log('=========state details', enqSourceDetails);
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
//     const filteredData = enqSourceDetails.rows.filter((row) => {
//       return (
//         row.name.toLowerCase().includes(searchValue) ||
//        row.code.toLowerCase().includes(searchValue)
     
//       );
//     });
//     setFilteredData(filteredData); // Update the filtered data state
//   };
//   const dataToDisplay = filteredData.length > 0 ? filteredData : enqSourceDetails.rows;

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
import { useDispatch, useSelector } from 'react-redux';
import { tableCustomStyles } from '../tableStyle.jsx';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import CardHead from 'ui-component/common/CardHead';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal';
import '../../../../assets/style/style.css';
// import { getEnqSource, deleteEnqSource } from 'module/admin/container/enqSourceContainer/slice';

import { getEnqMode, deleteEnqMode} from 'module/admin/container/enqModeContainer/slice';


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
  // const enqSourceDetails = useSelector((state) => state.data.enqsource.enqsourceData);

  const enqModeDetails =useSelector((state)=>state.adminReducer.enqmode.enqModeData)

  useEffect(() => {
    dispatch(getEnqMode({}));
    setTableHeading('Enquiry Mode');
  }, [dispatch]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Enquiry Mode');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Enquiry Mode');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Enquiry Mode');
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
    dispatch(deleteEnqMode(selectedId));
    setShowDeleteModal(false);
    dispatch(getEnqMode());
  };

  // const handleSearch = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   const filteredData = enqModeDetails.rows.filter((row) => {
  //     return (
  //       row.name.toLowerCase().includes(searchValue) ||
  //       row.code.toLowerCase().includes(searchValue)
  //     );
  //   });
  //   setFilteredData(filteredData); // Update the filtered data state
  // };

  // const dataToDisplay = filteredData.length > 0 ? filteredData : enqModeDetails.rows;

  const columns = [
    {
      name: 'NAME',
      selector: (row) => row.name
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => row.desc
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
      data={enqModeDetails.rows}
      // striped
      highlightOnHover
      pointerOnHover
      subHeader
      customStyles={tableCustomStyles}
      pagination
      paginationPerPage={6}
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
