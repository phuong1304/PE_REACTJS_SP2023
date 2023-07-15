import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Icon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
    overflow: 'hidden',
};

const EditModal = ({ newsId }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const [status, setStatus] = useState(false);
    const [views, setViews] = useState(1);
    const [actractive, setActractive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchNewsById(newsId)
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
                setContent(data.content);
                setViews(data.views);
                setImg(data.img);
                setActractive(data.actractive);


            })
            .catch((error) => console.log(error));
    }, [newsId]);

    const fetchNewsById = async (id) => {
        try {
            const response = await fetch(`https://64ac2fad9edb4181202f3f23.mockapi.io/api/products/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch news');
        }
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://64ac2fad9edb4181202f3f23.mockapi.io/api/products/${newsId}`, {
                method: 'PUT',
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
                console.log('News updated successfully');
                alert('News updated successfully. Please reload browser Dashboard!');
                handleClose();
                navigate('/dashboard');
            } else {
                throw new Error('Failed to update news');
            }
        } catch (error) {
            console.log(error);
            alert('Failed to update news');
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen} className="icon-edit">
                <Icon className="icon-edit-in">
                    <EditIcon />
                </Icon>
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        EDIT NEWS
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
                                variant="filled" />

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
                                variant="filled" />

                            <TextField
                                required
                                id="img"
                                label="Image URL"
                                value={img}
                                onChange={handleImgChange}
                                variant="filled" />

                            <TextField
                                required
                                id="views"
                                label="Views"
                                type="number"
                                value={views}
                                onChange={handleViewsChange}
                                variant="filled" />

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
                    <Button variant="contained" disableElevation onClick={handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default EditModal;
