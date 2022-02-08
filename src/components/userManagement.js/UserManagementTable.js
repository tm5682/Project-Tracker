import { Box, palette } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

import faker from "@faker-js/faker";
import { Avatar, Button, Grid, Typography } from "@mui/material";

import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

//css for table
const tableContainer = {
  borderRadius: 1,
  margin: "10 px 10 px",
  maxWidth: 14000,
};

const tableHeader = {
  fontWeight: "bold",
  //backgroundColor: (theme) => theme.palette.primary.light,
  color: (theme) => theme.palette.primary.dark,
  borderBottom: (theme) => `1px dotted ${theme.palette.primary.light}`,
};

const avatar = {
  backgroundColor: (theme) => theme.palette.primary.light,
  color: (theme) => theme.palette.getContrastText(theme.palette.primary.dark),
};

//This is MUI code customized

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//column headers
const headCells = [
  {
    id: "userId",
    numeric: false,
    disablePadding: true,
    label: "User Name",
  },
  {
    id: "userType",
    numeric: false,
    disablePadding: false,
    label: "User Type",
  },
  {
    id: "company",
    numeric: false,
    disablePadding: false,
    label: "Company",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "telephone",
    numeric: false,
    disablePadding: false,
    label: "Telephone",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ ...tableContainer }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ ...tableHeader }}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <AddIcon
        onClick={() => navigate(`/addNewUser/${projectId}`)}
        color="primary"
        sx={{
          "&:hover": {
            color: "white",
            bgcolor: "primary.light",
          },
        }}
      />
      <Typography
        color="textSecondary"
        sx={{ ml: 2, flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
      >
        Add A New User
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {};

//data of all the users
let userTableData = [];

//userType
const userType = ["Owner", "Project Admin", "Project User"];

//Main export function starts here
function UserManagementTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("dueDate");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { projectId } = useParams();

  const navigate = useNavigate();

  //this is to generate and hold fake issue data for now
  for (let i = 0; i < 20; i++) {
    userTableData[i] = {
      userId: faker.datatype.uuid(),
      name: faker.name.findName(),
      // projectName:
      //   faker.lorem.word().charAt(0).toUpperCase() + faker.lorem.word().slice(1),
      userType: userType[Math.floor(Math.random() * userType.length)],
      company:
        faker.lorem.word().charAt(0).toUpperCase() +
        faker.lorem.word().slice(1),
      email: faker.internet.exampleEmail(),
      telephone: faker.phone.phoneNumber(),
    };
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, projId, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = "";

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    }

    setSelected(newSelected);

    navigate(`/userManagement/${projectId}/${userId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userTableData.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ ...tableContainer }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={userTableData.length}
            />

            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(userTableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((userTableSingleData, index) => {
                  const isItemSelected = isSelected(userTableSingleData.userId);
                  //const labelId = `enhanced-table-checkbox-${index}`;
                  const labelId = userTableSingleData.userId;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={userTableSingleData.userId}
                      selected={isItemSelected}
                    >
                      <TableCell
                        onClick={(event) =>
                          handleClick(
                            event,
                            projectId,
                            userTableSingleData.userId
                          )
                        }
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ p: 1.5 }}
                      >
                        <Typography variant="body1" color="textSecondary">
                          {userTableSingleData.name}
                        </Typography>
                      </TableCell>

                      <TableCell
                        onClick={(event) =>
                          handleClick(event, userTableSingleData.userId)
                        }
                      >
                        <Typography>{userTableSingleData.userType}</Typography>
                      </TableCell>
                      <TableCell
                        onClick={(event) =>
                          handleClick(event, userTableSingleData.userId)
                        }
                      >
                        <Typography color="textSecondary" variant="body2">
                          {userTableSingleData.company}{" "}
                        </Typography>
                      </TableCell>

                      <TableCell
                        onClick={(event) =>
                          handleClick(event, userTableSingleData.userId)
                        }
                      >
                        {" "}
                        <Typography color="textSecondary" variant="body2">
                          {userTableSingleData.email}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="button" color="textSecondary">
                          {userTableSingleData.telephone}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userTableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default UserManagementTable;
