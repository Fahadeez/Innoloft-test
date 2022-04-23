import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import colors from "../../theme/palette";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function descendingComparator(a, b, orderBy) {
  console.log("a b orderBy",a,b,orderBy)
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
    console.log("sortOrder",order)
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell,index) => {

          return(
          <TableCell
            key={index}
            align={index == 0 ? 'left' : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy == headCell.id ? order : false}
            sx={{ color: "primary" }}
          >
            <TableSortLabel
              active={orderBy == headCell.id}
              direction={orderBy == headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden} color="primary">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          )
        }) }
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          color="primary"
        >
          Styles
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

var arrSlice = 4;

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowData, setRowData] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);



  const { rows } = props;

  const handleRequestSort = (event, property) => {
    console.log("sortt",orderBy,property,order)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
      
    setRowData(rows.slice(0,4))

  },[])

    const fetchMoreData = () => {
      if(rows.length == rowData.length){
        setHasMore(false)
      }
      setTimeout(() => {
        arrSlice += 4;
        setRowData(rows.slice(0,arrSlice))
      },1000)
     
    };

  return (
    <Box sx={{ width: "100%"}}>
          <InfiniteScroll
          dataLength={rowData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<CircularProgress sx={{marginLeft: '50%'}} color="primary" />}
          style={{ overflow: 'hidden' }}
        >
      <Paper sx={{ width: "100%", mb: 2 }} >
        <EnhancedTableToolbar numSelected={selected.length} />
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="StylesTable"
                    sheet="tablexls"
                    buttonText="Export as XLS"/>
    
        <TableContainer className="lookup-table">
          
          <Table sx={{ minWidth: 750,}} aria-labelledby="tableTitle" id="table-to-xls" >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={props.headCells}
            />
            <TableBody>
   
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rowData, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#e5f3ee",
                        },
                      }}
                    >
                      <TableCell component="th" id={labelId}  scope="row">
                        <Link to={"styleDetails/"+row.sku} style={{textDecoration: 'none'}}>
                          <Typography
                            sx={[
                              (theme) => ({
                              color: theme.palette.primary.main,
                              fontSize: '14px',
                                "&:hover": {
                                  color: theme.palette.primary.dark,
                                  textDecoration: 'underline'
                                },
                              }),
                            ]}
                          >
                            {row.sku}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="center">{row.skuDesc}</TableCell>
                      <TableCell align="center">{row.pillar}</TableCell>
                      <TableCell align="center">{row.photography}</TableCell>
                      <TableCell align="center">{row.sapInventory}</TableCell>
                      <TableCell align="center">{row.sku}</TableCell>
                      <TableCell align="center">{row.skuDesc}</TableCell>
                      <TableCell align="center">{row.pillar}</TableCell>
                      <TableCell align="center">{row.photography}</TableCell>
                      <TableCell align="center">{row.sapInventory}</TableCell>
                      <TableCell align="center">{row.sku}</TableCell>
                      <TableCell align="center">{row.skuDesc}</TableCell>
                      <TableCell align="center">{row.pillar}</TableCell>
                      <TableCell align="center">{row.photography}</TableCell>
                      <TableCell align="center">{row.sapInventory}</TableCell>
                      <TableCell align="center">{row.sku}</TableCell>
                      <TableCell align="center">{row.skuDesc}</TableCell>
                      <TableCell align="center">{row.pillar}</TableCell>
                      <TableCell align="center">{row.photography}</TableCell>
                      <TableCell align="center">{row.sapInventory}</TableCell>
                      <TableCell align="center">{row.sku}</TableCell>
                      <TableCell align="center">{row.skuDesc}</TableCell>
                      <TableCell align="center">{row.pillar}</TableCell>
                      <TableCell align="center">{row.photography}</TableCell>
                      <TableCell align="center">{row.sapInventory}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>

        </TableContainer>
   
      </Paper>
      </InfiniteScroll>

    </Box>
  );
}
