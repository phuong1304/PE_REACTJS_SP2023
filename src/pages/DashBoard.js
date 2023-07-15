import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BasicModal from '../components/Modal';
import { Icon } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './EditModal';
import Box from '@mui/material/Box';
import "../App.css";


const Dashboard = () => {
    const [newsList, setNewsList] = useState([]);

    // Lấy danh sách tin tức từ API hoặc nguồn dữ liệu khác
    useEffect(() => {
        // Gọi API để lấy danh sách tin tức
        fetchNewsList()
            .then((data) => setNewsList(data))
            .catch((error) => console.log(error));
    }, []);

    // Hàm gọi API để lấy danh sách tin tức
    const fetchNewsList = async () => {
        try {
            const response = await fetch('https://64ac2fad9edb4181202f3f23.mockapi.io/api/products');
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch news list');
        }
    };

    // Hàm xóa tin tức
    const handleDeleteNews = (id) => {
        // Gọi API để xóa tin tức dựa trên id
        deleteNews(id)
            .then(() => {
                // Cập nhật lại danh sách tin tức sau khi xóa thành công
                const updatedList = newsList.filter((news) => news.id !== id);
                setNewsList(updatedList);
                alert('Delete successfully.');
                // Hiển thị thông báo xóa thành công (có thể sử dụng modal, alert, toast...)
                console.log('News deleted successfully');
            })
            .catch((error) => console.log(error) & alert('Failed to delete news'));

    };


    // Hàm gọi API để xóa tin tức
    const deleteNews = async (id) => {
        try {
            const response = await fetch(`https://64ac2fad9edb4181202f3f23.mockapi.io/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to delete news');
            }
        } catch (error) {
            throw new Error('Failed to delete news');
        }
    };





    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>


            {/* Add new News */}
            <BasicModal />

            {/* Table dashboard */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'lightblue' }}>
                            <TableCell align="center" sx={{ fontWeight: '700', }}>Title</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700', }}>Description</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700', }}>Views</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700', }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700', }}>Actractive</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '700', }}>Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newsList.map((news) => (
                            <TableRow
                                key={news.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="div" scope="row"  >
                                    <div style={{ width: 250, whiteSpace: 'nowrap' }}>
                                        <Box
                                            component="div"
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                my: 2,
                                                p: 1,

                                                borderRadius: 2,
                                                fontSize: '0.875rem',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {news.title}
                                        </Box>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div style={{ width: 300, whiteSpace: 'nowrap' }}>
                                        <Box
                                            component="div"
                                            sx={{
                                                overflow: 'auto',
                                                my: 2,
                                                p: 1,


                                                fontSize: '0.875rem',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {news.description}
                                        </Box>
                                    </div>
                                </TableCell>
                                <TableCell align="center" >{news.views}</TableCell>
                                <TableCell align="center">{news.status ? 'True' : 'False'}</TableCell>
                                <TableCell align="center">{news.actractive ? 'True' : 'False'}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/detail/${news.id}`}><Icon><RemoveRedEyeIcon /></Icon></Link>{' '}
                                    <button className='bth-edit'><EditModal newsId={news.id} />{' '}</button>
                                    <button onClick={() => handleDeleteNews(news.id)} > <Icon><DeleteIcon /></Icon> </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Dashboard;
