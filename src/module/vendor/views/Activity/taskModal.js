import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Box, TextField, Radio } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { tableCustomStyles } from '../tableStyle';
import { capitalizeFirstLetter } from '../utilities/Capitallised'
import { gettask } from 'module/vendor/container/customerContainer/slice';
import { getUser } from 'module/vendor/container/userContainer/slice';


function TaskModal({ onSelect }) {
    const dispatch = useDispatch();
    const taskDetails = useSelector((state) => state.data.customers.customerData);
    const userDetails = useSelector((state) => state.data.user.userData);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        dispatch(gettask())
        dispatch(getUser())
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(taskDetails.rows);
    }, [taskDetails]);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredData = taskDetails?.rows?.filter((row) => {
            return (row?.taskTitle?.toLowerCase().includes(searchValue)
            )
        });
        setFilteredData(filteredData);
    };
    const dataToDisplay = filteredData.length > 0 ? filteredData : taskDetails.rows;

    const handleRowSelect = (row) => {
        onSelect(row);
        setSelectedRow(row);
    };

    const columns = [
        {
            name: 'SELECT',
            cell: (row) => (
                <Radio
                    checked={selectedRow && selectedRow.taskId === row.taskId}
                    onChange={() => { handleRowSelect(row) }}
                />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'TASK ID',
            selector: (row) => row.taskId,
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
        }
    ];
    return (
        <Box>
            <DataTable
                columns={columns}
                data={dataToDisplay}
                customStyles={tableCustomStyles}
                striped
                highlightOnHover
                pointerOnHover
                onRowClicked={handleRowSelect}
                subHeader
                pagination
                paginationPerPage={6}
                paginationRowsPerPageOptions={[10, 20, 30]}
                subHeaderComponent={
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            onChange={handleSearch}
                            style={{ backgroundColor: 'white', width: '40vh' }}
                        />
                    </Box>
                }
            />
        </Box>
    )
}


export default TaskModal;