import DataTable from 'react-data-table-component';
import React, { useState } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';

// import TableRows from 'ui-component/Table/TableRows';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { tableCustomStyles } from '../tableStyle.jsx';
import { useEffect } from 'react';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal';


import { getSupportType, deleteSupportType } from 'module/admin/container/supportTypeContainer/slice';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const supportTypeDetails = useSelector((state) => state.adminReducer.supportType.supportTypeData);

  console.log('=========suppprt details', supportTypeDetails);
  useEffect(() => {
    dispatch(getSupportType({}));
    setTableHeading('SUPPORT TYPE');
  }, [dispatch]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add SupportType');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit SupportType');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View SupportType');
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
    dispatch(getSupportType());
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteSupportType(selectedId));
    setShowDeleteModal(false);
    dispatch(getSupportType());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = supportTypeDetails.rows.filter((row) => {
      return (row.supportType.toLowerCase().includes(searchValue) || row.desc.toLowerCase().includes(searchValue))
    });
    setFilteredData(filteredData); // Update the filtered data state
  };
  const dataToDisplay = filteredData.length > 0 ? filteredData : supportTypeDetails.rows;

  const columns = [
    {
      name: 'SUPPORT TYPE',
      selector: (row) => row.supportType
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => {
        if(row.desc.length > 20) {
          return row.desc.substring(0,20) + '....'
        }
        return row.desc
      }
    },
    {
      name: 'STATUS',
      selector: (row) => (row.isActive ? 'true' : 'false') // Assuming isActive is a boolean
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
      data={dataToDisplay}
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
          <CardHead
            tableHeading={tableHeading}
            handleAddModal={() => handleOpenModal('addform')}
            supportTypeDetails={supportTypeDetails}
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
  );
}
