import React, { useState, useEffect } from 'react';
import { IconButton, MenuItem } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DataTable from 'react-data-table-component';
import OpenModal from 'ui-component/common/OpenModal';
import AddEditModal from './addEditModal';
import DeleteModal from 'ui-component/Modals/DeleteModal';
import ViewModal from './viewModal';
import CardHead from 'ui-component/common/CardHead';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser } from 'module/vendor/container/userContainer/slice';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { tableCustomStyles } from '../tableStyle.jsx';
import '../../../../assets/style/style.css';

export default function Index() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState('');
  const [modalComponent, setModalComponent] = useState(null);
  const [modalHeading, setModalHeading] = useState('');
  const [tableHeading, setTableHeading] = useState('');
  const [filter, setFilter] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.user.userData);
  const dataval = useSelector((state) => state.data.user.userData.count);
  const modalStyle = { width: '60%' };

  useEffect(() => {
    dispatch(getUser({}));
    setTableHeading('My Team');
    setFilter('filter');
    setCount(Number(dataval));
  }, [dispatch, dataval]);

  const role = [
    { id: 'vendor', name: 'Vendor' },
    { id: 'vendorAcnt', name: 'Account' },
    { id: 'vendorMngr', name: 'Manager' },
    { id: 'vendorOptr', name: 'Operator' },
  ]
  const handleOpenModal = (whichOpen, item) => {
    setOpenModal(true);
    let ComponentToRender;
    switch (whichOpen) {
      case 'addform':
        setModalHeading('Add MyTeam');
        ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'editform':
        setModalHeading('Edit MyTeam');
        ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
        break;
      case 'viewform':
        setModalHeading('View MyTeam');
        ComponentToRender = <ViewModal data={item} />;
        break;
      default:
        ComponentToRender = null;
    }
    setModalComponent(ComponentToRender);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = userDetails.rows.filter((row) => {
      return (
        row.fName.toLowerCase().includes(searchValue) ||
        row.lName.toLowerCase().includes(searchValue) ||
        row.email.toLowerCase().includes(searchValue) ||
        row.mobileNo.toLowerCase().includes(searchValue)
      );
    });
    setFilteredData(filteredData);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setShowDeleteModal(false);
  };

  const handleDeleteModal = (item) => {
    setShowDeleteModal(true);
    setSelectedId(item.id);
  };

  const deleteReferenceConfirm = () => {
    dispatch(deleteUser(selectedId));
    setShowDeleteModal(false);
  };

  const columns = [
    {
      name: 'NAME',
      selector: (row) => capitalizeFirstLetter(row.fName),
    },
    {
      name: 'EMAIL',
      selector: (row) => row.email,
    },
    {
      name: 'USER ROLE',
      selector: (row) => capitalizeFirstLetter(role.find((role) => role.id == row.role)?.name),
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
      ),
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setAnchorEl(null);
    const filteredData = userDetails.rows.filter((row) => row.role === role);
    setFilteredData(filteredData);
  };

  return (
    <DataTable
      customStyles={tableCustomStyles}
      columns={columns}
      data={filteredData.length > 0 ? filteredData : userDetails.rows}
      highlightOnHover
      pointerOnHover
      subHeader
      pagination
      striped
      paginationPerPage={6}
      paginationRowsPerPageOptions={[10, 20, 30]}
      subHeaderComponent={
        <div>
          <CardHead
            searchHandler={handleSearch}
            tableHeading={tableHeading}
            filter={filter}
            count={count}
            handleAddModal={() => handleOpenModal('addform')}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '10px' }}>Filter by Role:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
              <IconButton size="small" onClick={handleClick}>
                {anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <div style={{ padding: '0 5px' }}>{selectedRole || 'All'}</div>
            </div>
            {anchorEl && (
              <div style={{ position: 'absolute', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', marginTop: '30px' }}>
                <MenuItem onClick={() => handleRoleSelect('')}>All</MenuItem>
                <MenuItem onClick={() => handleRoleSelect('vendorAcnt')}>Account</MenuItem>
                <MenuItem onClick={() => handleRoleSelect('vendorMngr')}>Manager</MenuItem>
                <MenuItem onClick={() => handleRoleSelect('vendorOptr')}>Operator</MenuItem>
              </div>
            )}
          </div>
          {selectedRole && filteredData.length === 0 && (
            <div>No data found for {capitalizeFirstLetter(selectedRole)} role.</div>
          )}
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
