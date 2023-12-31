import { Helmet } from 'react-helmet-async';
import { create, filter } from 'lodash';
import { useState, useEffect } from 'react';
// @mui
import {
  Link,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination
} from '@mui/material';

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { SnackBar } from '../../components/snackbar';

// sections
// import { Header, UserListToolbar } from '../../sections/@dashboard/user';
import { Header } from '../../components/table-header';
/* eslint-disable camelcase */


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'e_title', label: 'E title', alignRight: false },
  { id: 'm_title', label: 'M title', alignRight: false },
  { id: 'p_e_title', label: 'M Parent Menu', alignRight: false },
  { id: 'p_m_title', label: 'E Parent Menu', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.e_title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function NavBarSubMenuPage() {
    const [open, setOpen] = useState(null);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openId, setOpenId] = useState();
    // snack bar
    const [snackOpen, setSnackOpen] = useState(false);
    const [severity, setSeverity] = useState();
    const [message, setMessage] = useState();
    const [duration, setDuration] = useState();
    // user from api
    const [nbMenus, setNbMenu] = useState();
    const [totalPages, setTotalPages] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    //* api url
    const getAllUserUrl = '/admin/navbar-sub-menus/all';
    const deletUserUrl = '/admin/navbar-sub-menus/delete';
    
    // fetch users data---------------------------------------------
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(getAllUserUrl, {
                    signal: controller.signal
                });
                console.log(response)
                if(isMounted){
                    setNbMenu(response.data);
                }
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getData();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    //* delete users data ----------------------------
    const handleDelete = async () => {
        try {
            const data = {
                id: openId
            }
            await axiosPrivate.post(deletUserUrl, JSON.stringify(data))
            settingSnackBar("Delete success", "success");
            setNbMenu(nbMenus.filter(usr => usr.id !== openId));
            setOpen(false);
        } catch (err) {
        settingSnackBar("Delete Fail!", "warrning");
        
        }
    };

    const settingSnackBar = (message, severity) => {
        setSnackOpen(true);
        setMessage(message);
        setSeverity(severity);
        setDuration(1000);
    };

    const handleOpenMenu = (e, id) => {
        setOpen(e.currentTarget);
        setOpenId(id);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nbMenus?.length) : 0;

    const filteredNbMenus = applySortFilter(nbMenus, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredNbMenus?.length && !!filterName;

    return (
        <>
        <Helmet>
            <title> Navbar Menu | CCKL </title>
        </Helmet>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Navbar Sub Menu
                </Typography>
                <Link to="/dashboard/navbar-sub-menus/create" component={RouterLink} state={{ from: location}} replace>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New NavBar Sub Menu
                    </Button>
                </Link>
            </Stack>
            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <Header
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                        {filteredNbMenus?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                            const { id, e_title, m_title, navbar_menu } = row;
                            return (
                                <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                    <TableCell padding="checkbox">
                                    {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, username)} /> */}
                                    </TableCell>

                                    <TableCell component="th" scope="row" padding="none">
                                        <RouterLink to={`/dashboard/navbar-sub-menus/detail?v=${id}`}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography variant="subtitle2" noWrap>
                                                {e_title}
                                                </Typography>
                                            </Stack>
                                        </RouterLink>
                                        
                                    </TableCell>

                                    <TableCell align="left">{m_title}</TableCell>
                                    <TableCell align="left">{navbar_menu.e_title}</TableCell>
                                    <TableCell align="left">{navbar_menu.m_title}</TableCell>
                                    
                                    <TableCell align="right">
                                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e,id)}>
                                        <Iconify icon={'eva:more-vertical-fill'} />
                                    </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody> 
        
                        {isNotFound && (
                        <TableBody>
                            <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                <Paper
                                sx={{
                                    textAlign: 'center',
                                }}
                                >
                                <Typography variant="h6" paragraph>
                                    Not found
                                </Typography>

                                <Typography variant="body2">
                                    No results found for &nbsp;
                                    <strong>&quot;{filterName}&quot;</strong>.
                                    <br /> Try checking for typos or using complete words.
                                </Typography>
                                </Paper>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                        )} 
                    </Table>
                    </TableContainer>
                </Scrollbar>

            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            </Card>
        </Container>

        <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
            sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
                },
            },
            }}
        >
            <Link to={`/dashboard/navbar-sub-menus/edit/${openId}`} component={RouterLink} sx={{ display: 'contents' }}>
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>
            </Link>

            <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
            </MenuItem>
        </Popover>
        
        {/* Success Snack bar */}
        <SnackBar
            open= {snackOpen}
            duration= {duration}
            handleClose= { ()=> setSnackOpen(false)}
            severity= {severity}
            message= {message}
        />
        </>
    );
}
