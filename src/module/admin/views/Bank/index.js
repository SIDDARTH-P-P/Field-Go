import DataTable from 'react-data-table-component';
import React, { useState } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import '../../../../assets/style/style.css';
import ViewModal from './viewModal';
import { IconButton } from '@mui/material';
import { tableCustomStyles } from '../tableStyle.jsx';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { getBank, deleteBank } from 'module/admin/container/bankContainer/slice';

export default function Support() {
  const [tableHeading, setTableHeading] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const bankDetails = useSelector((state) => state.adminReducer.bank.bankData);
  const bankCount = useSelector((state) => state.adminReducer.bank.bankData.count);

  console.log('========bankDetails=======', bankDetails);
  console.log('========bankCount=======', bankCount);
  useEffect(() => {
    dispatch(getBank({}));
    setTableHeading('BANK');
  }, [dispatch]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    // setSelectedRow(item); 
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Bank');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Bank');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Bank');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  //   setShowDeleteModal(false);
  // };
  const handleCloseModal = (formtype) => {
    setOpenModal(false);
    setShowDeleteModal(false);
    if (formtype === 'addform') setPage(1);
    dispatch(getBank());
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
    
  };

  // const deleteReferenceConfirm = () => {
  //   dispatch(deleteBank(selectedId))
  //     .then(() => {
  //       setShowDeleteModal(false);
  //       toast.error('Support deleted successfully', { autoClose: 3000 }); 
       
  //     })
  //     .catch((error) => {
  //       console.error('Failed to delete support:', error);
  //       toast.error('Failed to delete support', { autoClose: 3000 }); 
  //     });
  //     dispatch(getBank());
  // };

  const deleteReferenceConfirm = () => {
    dispatch(deleteBank(selectedId));
    setShowDeleteModal(false);
    dispatch(getBank());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = bankDetails.rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue) ||
        row.code.toLowerCase().includes(searchValue) ||
        row.desc.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filteredData); 
  };
  const dataToDisplay = filteredData.length > 0 ? filteredData : bankDetails.rows;

  const columns = [
    {
      name: 'BANK NAME',
      selector: (row) => row.name
    },

    {
      name: 'CODE',
      selector: (row) => row.code
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => row.desc.substring(0,20) + '....'
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility style={{ color: 'blue' }} />
          </IconButton>
          <IconButton onClick={() => handleOpenModal('editform', row)}>
            <EditNoteIcon style={{ color: 'green' }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete style={{ color: 'red' }} />
          </IconButton>
        </div>
      )
    }
  ];
 
  return (
    <div style={{ overflowX: 'auto' }}>
      <DataTable
        columns={columns}
        data={dataToDisplay}
        striped
        highlightOnHover
        pointerOnHover
        subHeader
        pagination
        customStyles={tableCustomStyles}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20, 30]}
        subHeaderComponent={
          <div>
            <CardHead
              tableHeading={tableHeading}
              handleAddModal={() => handleOpenModal('addform')}
              bankDetails={bankDetails}
              searchHandler={handleSearch}
            />
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
    </div>
  );
}






// import DataTable from 'react-data-table-component';
// import React, { useState } from 'react';
// import OpenModal from 'ui-component/common/OpenModal';
// import AddEditModal from './addEditModal';
// import CardHead from 'ui-component/common/CardHead';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import DeleteModal from 'ui-component/Modals/DeleteModal';
// import '../../../../assets/style/style.css';
// import ViewModal from './viewModal';
// import { IconButton } from '@mui/material';

// import { Visibility, Delete } from '@mui/icons-material';
// import EditNoteIcon from '@mui/icons-material/EditNote';

// import { getSupport, deleteSupport } from 'module/vendor/container/supportContainer/slice';

// export default function Support() {
//   const [tableHeading, setTableHeading] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const [modalComponent, setModalComponent] = useState(null);
//   const [modalHeading, setModalHeading] = useState('');

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   // const [selectedRow, setSelectedRow] = useState(null);
//   const [selectedId, setSelectedId] = useState();

//   const [filteredData, setFilteredData] = useState([]);

//   const modalStyle = { width: '60%' };
//   const dispatch = useDispatch();
//   const supportDetails = useSelector((state) => state.support.support.supportData);

//   console.log('========supportDetails=======', supportDetails);

//   useEffect(() => {
//     dispatch(getSupport());
//     setTableHeading('SUPPORT');
//   }, [dispatch]);

//   const handleOpenModal = (whichOpen, item) => {
//     setOpenModal(true);
//     // setSelectedRow(item); // Store selected row
//     let ComponentToRender;
//     switch (whichOpen) {
//       case 'addform':
//         setModalHeading('Add Support');
//         ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'editform':
//         setModalHeading('Edit Support');
//         ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
//         break;
//       case 'viewform':
//         setModalHeading('View Support');
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
//     dispatch(deleteSupport(selectedId));
//     setShowDeleteModal(false);
//     dispatch(getSupport());
//   };

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filteredData = supportDetails.rows.filter((row) => {
//       return (
//         row.sprtType?.supportType.toLowerCase().includes(searchValue) ||
//         row.priority.toLowerCase().includes(searchValue) ||
//         row.desc.toLowerCase().includes(searchValue)
//       );
//     });
//     setFilteredData(filteredData); // Update the filtered data state
//   };
//   const dataToDisplay = filteredData.length > 0 ? filteredData : supportDetails.rows;

//   const columns = [
//     {
//       name: 'SUPPORT TYPE',
//       selector: (row) => row.sprtType?.supportType || 'N/A'
//     },

//     {
//       name: 'PRIORITY',
//       selector: (row) => row.priority
//     },
//     {
//       name: 'SUPPORT QUERY',
//       selector: (row) => row.desc
//     },
//     {
//       name: 'IMAGE',
//       cell: (row) => <img src={row.imgUrls} alt="Support" style={{ height: '100px' }} /> // Assuming imgUrls is a URL to the image
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div>
//           <IconButton onClick={() => handleOpenModal('viewform', row)}>
//             <Visibility style={{ color: 'blue' }} />
//           </IconButton>
//           <IconButton onClick={() => handleOpenModal('editform', row)}>
//             <EditNoteIcon style={{ color: 'green' }} />
//           </IconButton>
//           <IconButton onClick={() => handleDeleteModal(row)}>
//             <Delete style={{ color: 'red' }} />
//           </IconButton>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <DataTable
//         columns={columns}
//         data={dataToDisplay}
//         striped
//         highlightOnHover
//         pointerOnHover
//         subHeader
//         pagination
//         paginationPerPage={10}
//         paginationRowsPerPageOptions={[10, 20, 30]}
//         subHeaderComponent={
//           <div>
//             <CardHead
//               tableHeading={tableHeading}
//               handleAddModal={() => handleOpenModal('addform')}
//               supportDetails={supportDetails}
//               searchHandler={handleSearch}
//             />
//             {openModal && (
//               <OpenModal
//                 open={openModal}
//                 handleClose={handleCloseModal}
//                 component={modalComponent}
//                 mdlwidth={modalStyle.width}
//                 mdlHeading={modalHeading}
//               />
//             )}
//             {showDeleteModal && (
//               <DeleteModal open={showDeleteModal} handleClose={handleCloseModal} id={selectedId} onDeleteConfirm={deleteReferenceConfirm} />
//             )}
//           </div>
//         }
//       />
//     </div>
//   );
// }