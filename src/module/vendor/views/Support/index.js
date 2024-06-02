
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
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { tableCustomStyles } from '../tableStyle.jsx';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { getSupport, deleteSupport } from 'module/vendor/container/supportContainer/slice';

export default function Index() {
  const [tableHeading, setTableHeading] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);

  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const supportDetails = useSelector((state) => state.data.support.supportData);

  console.log('=========suppprt details', supportDetails);
  useEffect(() => {
    dispatch(getSupport({}));
    setTableHeading('SUPPORT TYPE');
  }, [dispatch]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Support');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Support');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Support');
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
    // dispatch(getSupport());
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteSupport(selectedId));
    setShowDeleteModal(false);
    dispatch(getSupport());
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = dataToDisplay.filter((row) => {
      return row.sprtType?.supportType.toLowerCase().includes(searchValue) || row.desc.toLowerCase().includes(searchValue);
    });
    setFilteredData(filteredData); // Update the filtered data state
  };
  
  const dataToDisplay = filteredData.length > 0 ? filteredData : supportDetails.rows;

  const columns = [
    {
      name: 'SUPPORT TYPE',
      selector: (row) => capitalizeFirstLetter(row.sprtType?.supportType) || 'N/A'
    },
    {
      name: 'PRIORITY',
      selector: (row) => capitalizeFirstLetter(row.priority)
    },
    {
      name: 'DESCRIPTION',
      selector: (row) => {
        if (row.desc) {
          return capitalizeFirstLetter(row.desc.length > 20 ? row.desc.substring(0, 20) + '....' : row.desc)
        } else {
          return 'N/A'; // Add default value if description is undefined
        }
      }
    },
    {
      name: 'IMAGE',
      cell: (row) => <img src={row.imgUrls} alt="Support" style={{ width:'100px', height: '100px' }} /> // Assuming imgUrls is a URL to the image
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className="actn-icon1" />
          </IconButton>
          <IconButton onClick={() => handleOpenModal('editform', row)}>
            <EditNoteIcon className="actn-icon2" />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className="actn-icon3" />
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
      customStyles={tableCustomStyles}
      subHeader
      pagination
      striped
      paginationPerPage={6}
      paginationRowsPerPageOptions={[10, 20, 30]}
      subHeaderComponent={
        <div>
          <CardHead
            tableHeading={tableHeading}
            handleAddModal={() => handleOpenModal('addform')}
            supportDetails={supportDetails}
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


 