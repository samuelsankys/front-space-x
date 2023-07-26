import { useCallback, useEffect, useState } from 'react';
import { Box,  Card,  CardMedia,  Hidden, Link, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { baseURL } from '../../utils/constantes';
import LogoYoutube from '../../assets/images/logo_youtube.png'
import axios from 'axios'
import moment from 'moment'
import Search from '../../components/search';
import debounce from 'lodash/debounce';
import queryString from 'query-string';

function createData(flightNumber, logo, mission, releaseDate, rocket, result, video) {
  return { flightNumber, logo, mission, releaseDate, rocket, result, video };
}

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
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

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


const headCells = [
  {
    id: 'flightNumber',
    align: 'left',
    disablePadding: false,
    label: 'Nº Vôo'
  },
  {
    id: 'logo',
    align: 'left',
    disablePadding: true,
    label: 'Logo'
  },
  {
    id: 'mission',
    align: 'left',
    disablePadding: false,
    label: 'Missão'
  },
  {
    id: 'releaseDate',
    align: 'left',
    disablePadding: false,
    label: 'Data de Lançamento'
  },
  {
    id: 'rocket',
    align: 'left',
    disablePadding: false,
    label: 'Foguete'
  },
  {
    id: 'result',
    align: 'left',
    disablePadding: false,
    label: 'Resultado'
  },
  {
    id: 'video',
    align: 'center',
    disablePadding: false,
    label: 'Vídeo'
  }
];

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error)
        return setError(error)
      })
      .finally(() => setLoading(false))
  },[url])

  return { data, loading, error }
}


function OrderTableHead({ order, orderBy }) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{fontSize: '.9rem'}}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const OrderStatus = ({ status }) => {
  const theme = useTheme();
  let color;
  let title;
  if (status) {
    color = theme.palette.success.main;
    title = 'Sucesso';
  }else{
    color = theme.palette.error.main;
    title = 'Falhou';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
       <Box
      sx={{
        width:  10,
        height:  10,
        borderRadius: '50%',
        bgcolor: color
      }}
    />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const updateURL = (searchValue, pageSizeValue, pageNumberValue) => {
  const queryParams = queryString.stringify({ search: searchValue, page: pageNumberValue, limit: pageSizeValue });
  const newURL = `${window.location.pathname}?${queryParams}`;
  window.history.pushState(null, '', newURL);
};

export default function LaunchTables() {

  const [order] = useState('desc');
  const [orderBy] = useState('flight_number');
  const [selected] = useState([]);

  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [rows, setRow] = useState([]);
  const {data, loading} = useFetch(baseURL + `/launches?search=${search}&pageSize=${pageSize}&pageNumber=${page}`)
  
  const handleChangePage = useCallback(
    debounce((event, newPage) => {
      setPage(newPage);
    }, 500),
    []
  );

  const handleChangeItemsPerPage = useCallback(
    debounce((event) => {
      setPageSize(event.target.value);
      setPage(1);
    }, 500),
    []
  );

  const handleSearch = useCallback(
    debounce((searchValue) => {
      setSearch(searchValue);
      setPage(1);
    }, 500),
    []
  );

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  useEffect(() => {
    handleChangePage(null, page);
  }, [ page, handleChangePage]);

  useEffect(() => {
    updateURL(search, pageSize, page)
  }, [ search, pageSize, page]);


  useEffect(() => {
    handleChangeItemsPerPage({ target: { value: pageSize } });
  }, [pageSize, handleChangeItemsPerPage]);

  useEffect(() => {
    if (data) {
      const rows = data.results.map((item)=>{
        return createData(item.flight_number, item.links.patch_small, item.name, moment(item.date_utc).format('DD/MM/YYYY'), item.rockets.name ,item.success, item.links.webcast)
      })
      setRow(rows)
      
    }
  },[data]);

  const isSelected = (flightNumber) => selected.indexOf(flightNumber) !== -1;

  return (
    <div>
      <Box width={'100%'}>
          <Search onSearch={handleSearch} />
          <Box display="flex" alignItems="center" justifyContent="flex-end" px={2} py={1}>
            <Typography sx={{ paddingRight: 1 }}>Itens por página:</Typography>
            <Select
            value={pageSize}
            onChange={handleChangeItemsPerPage}
              size="small"
              label="Itens por página"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
        </Box>
      </Box>
      <Card
            content={false}
            elevation= {3}
            sx={{
            border: '1px solid',
            borderRadius: 2,
            }}
        >
      <Box>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
         
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            sx={{
              '& .MuiTableCell-root:first-of-type': {
                pl: 2
              },
              '& .MuiTableCell-root:last-of-type': {
                pr: 3
              }
            }}
          >
            <Hidden smDown>
              <OrderTableHead order={order} orderBy={orderBy} />
            </Hidden>
            { loading && <p>Loading ...</p>}
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.flightNumber);

                return (
                  <>
                  <Hidden smDown>
                   <TableRow
                  key={row.flightNumber}
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={row.flightNumber} scope="row" align="left">
                    <Typography>{row.flightNumber}</Typography></TableCell>
                    <TableCell align="center">
                        <CardMedia component="img" src={row.logo} alt='`logo ${row.mission}`' style={{ height: '3rem', width: '3rem' }} />
                    </TableCell>
                    <TableCell align="left"><Typography>{row.mission}</Typography></TableCell>
                    <TableCell align="left"><Typography>{row.releaseDate}</Typography></TableCell>
                    <TableCell align="left"><Typography>{row.rocket}</Typography></TableCell>
                    <TableCell align="left">
                      <OrderStatus status={row.result} />
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                    <Link href={row.video} underline="none" align="right">
                      <CardMedia component="img" src={LogoYoutube} alt='`link youtube' style={{ height: '3rem', width: '3rem' }} />
                      </Link>
                    </TableCell>
                  </TableRow>
                  </Hidden>
                  <Hidden smUp>
                    <TableRow
                    key={row.flightNumber}
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={row.flightNumber} scope="row" align="center">
                        <Typography>{row.flightNumber}</Typography>
                        <div >
                        <CardMedia component="img" src={row.logo} alt='`logo ${row.mission}`' style={{ height: '2.5rem', width: '2.5rem', margin:'0 auto' }} />

                        </div>
                      </TableCell>
                      <TableCell align="center" style={{ wordBreak: 'break-word', minWidth: 50 }}>
                        <Typography fontWeight={600}>{row.mission}</Typography>
                        <Typography>{row.rocket}</Typography>
                        <Typography>{row.releaseDate}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Link href={row.video} underline="none" align="right">
                          <CardMedia component="img" src={LogoYoutube} alt='`link youtube' style={{ height: '2.5rem', width: '2.5rem' }} />
                        </Link>
                        <OrderStatus status={row.result} />
                      </TableCell>
                    </TableRow>
                  </Hidden>
                  
                  </>
                 
                );
              })}
            </TableBody> 
          </Table>
        <Box display={'flex'} justifyContent={'end'} sx={{my:5, mr: 5}}>
          <Pagination count={data?.totalPages} page={page} variant="outlined" color="primary" onChange={handleChangePage} hidePrevButton={!data?.hasPrev} hideNextButton={!data?.hasNext} />
        </Box>
        </TableContainer>
      </Box>
      </Card>
    </div>
  );
}