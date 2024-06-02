import DataTable from 'react-data-table-component';
import React, { useState } from 'react';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import '../../../../assets/style/style.css'
import ViewModal from './viewModal';
import { IconButton } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {capitalizeFirstLetter}  from '../utilities/Capitallised'
import { gettask, deletetask } from 'module/vendor/container/customerContainer/slice';
import { tableCustomStyles } from '../tableStyle.jsx';
import { getUser } from 'module/vendor/container/userContainer/slice';

export default function Index() {
  const [tableHeading, setTableHeading] = useState('');
  const [count, setCount] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([])
  const modalStyle = { width: '60%' };
  const dispatch = useDispatch();
  const taskDetails = useSelector((state) => state.data.customers.customerData);
  const dataval = useSelector((state) => state.data.customers.customerData.count)
  const userDetails = useSelector((state) => state.data.user.userData);

  console.log('=================cust===================', userDetails);

  useEffect(() => {
    dispatch(getUser())
    dispatch(gettask());
    setTableHeading('Tasks');
    setCount(Number(dataval));
  }, [dispatch, dataval]);

  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add Task');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit Task');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View Task');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = taskDetails.rows.filter((row) => {
      return (row.taskPriority.toLowerCase().includes(searchValue) ||
        row.status.toLowerCase().includes(searchValue) ||
        userDetails?.rows?.find((assignedTo) => assignedTo.id == row?.assignedTo?.id)?.fName?.toLowerCase().includes(searchValue)
      )
    });
    setFilteredData(filteredData);
  };
  const dataToDisplay = filteredData.length > 0 ? filteredData : taskDetails.rows;

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
    dispatch(deletetask(selectedId));
    setShowDeleteModal(false);
    dispatch(gettask());
  };



  const columns = [
    {
      name: 'TASK ID',
      selector: row => row.taskId,
    },
    {
      name: 'TASK TITLE',
      selector: row => capitalizeFirstLetter(row.taskTitle),
    },
    {
      name: 'ASSIGNED TO',
      selector: row => capitalizeFirstLetter(userDetails?.rows?.find((assignedTo) => assignedTo.id == row?.assignedTo?.id)?.fName || '',)
    },
    {
      name: 'PRIORITY',
      selector: row => capitalizeFirstLetter(row.taskPriority),
    },
    {
      name: 'STATUS',
      selector: row => capitalizeFirstLetter(row.status),
    },
    // row.contactMobile1,
    // {
    //   name: 'USER ROLE',
    //   selector: row => row.role,
    // },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleOpenModal('viewform', row)}>
            <Visibility className='actn-icon1' />
          </IconButton>
          <IconButton onClick={() => handleOpenModal('editform', row)}>
            <EditNoteIcon className='actn-icon2' />
          </IconButton>
          <IconButton onClick={() => handleDeleteModal(row)}>
            <Delete className='actn-icon3' />
          </IconButton>
        </div>

      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      // data={taskDetails.rows}
      customStyles={tableCustomStyles}
      data={dataToDisplay}
      striped
      highlightOnHover
      pointerOnHover
      subHeader
      pagination
      paginationPerPage={6}
      paginationRowsPerPageOptions={[10, 20, 30]}
      subHeaderComponent={
        <div >

          <CardHead tableHeading={tableHeading} count={count} handleAddModal={() => handleOpenModal('addform')} searchHandler={handleSearch} />
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
            <DeleteModal
              open={showDeleteModal}
              handleClose={handleCloseModal}
              id={selectedId}
              onDeleteConfirm={deleteReferenceConfirm}
            />
          )}
        </div>
      }
    />
  );
}