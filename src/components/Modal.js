import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {

    const [open, setOpen] = React.useState(false);
    const [newsList, setNewsList] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Alert sau khi ấn add news
    const [isNewsAdded, setIsNewsAdded] = useState(null);


    // Load lại dashboard

    const navigate = useNavigate();
    const handleAddNewNews = async () => {
        try {
            const response = await fetch('https://64ac2fad9edb4181202f3f23.mockapi.io/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    content,
                    img,
                    status,
                    views,
                    actractive,
                }),
            });

            if (response.ok) {
                // Đã tạo News thành công, có thể cập nhật danh sách tin tức hoặc chuyển hướng đến trang Dashboard
                console.log('News created successfully');
                alert('News created successfully. Please reload browser Dashboard!');
                setIsNewsAdded(true);
                // Cập nhật lại danh sách tin tức sau khi tạo thành công
                const updatedList = [...newsList, { title, description, content, img, status, views, actractive }];
                setNewsList(updatedList);
                // Đóng modal sau khi tạo thành công
                handleClose();
                // Chuyển hướng đến trang Dashboard
                navigate('/dashboard');
            } else {
                throw new Error('Failed to create news');
                setIsNewsAdded(false);
                alert('Failed to create news');
            }

        } catch (error) {
            console.log(error);
            alert('Failed to create news');
        }
    };



    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const [status, setStatus] = useState(false);
    const [views, setViews] = useState(1);
    const [actractive, setActractive] = useState(false);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImgChange = (event) => {
        setImg(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.checked);
    };

    const handleViewsChange = (event) => {
        setViews(event.target.value);
    };

    const handleActractiveChange = (event) => {
        setActractive(event.target.checked);
    };




    return (
        <div>
            <Button onClick={handleOpen}>Add new News <Icon className='icon-add'><AddIcon /></Icon></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        CREATE NEW NEWS
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '38ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="title"
                                label="Title"
                                value={title}
                                onChange={handleTitleChange}
                                variant="filled"
                            />

                            <TextField
                                required
                                id="description"
                                label="Description"
                                value={description}
                                onChange={handleDescriptionChange}
                                variant="filled"
                            />

                            <TextField
                                required
                                id="content"
                                label="Content"
                                value={content}
                                onChange={handleContentChange}
                                variant="filled"
                                multiline
                                rows={4}
                            />

                            <TextField
                                required
                                id="img"
                                label="Image URL"
                                value={img}
                                onChange={handleImgChange}
                                variant="filled"
                            />

                            <TextField
                                required
                                id="views"
                                label="Views"
                                type="number"
                                value={views}
                                onChange={handleViewsChange}
                                variant="filled"
                            />

                            <label htmlFor="status">Status:</label>
                            <input
                                type="checkbox"
                                id="status"
                                checked={status}
                                onChange={handleStatusChange}
                            />


                            <label htmlFor="attractive">Attractive:</label>
                            <input
                                type="checkbox"
                                id="attractive"
                                checked={actractive}
                                onChange={handleActractiveChange}
                            />
                        </div>
                    </Box>
                    <Button variant="contained" disableElevation onClick={handleAddNewNews}>
                        Add new News
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
