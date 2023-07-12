import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Home() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const handleDetail = (id) => {
        navigate(`/detail/${id}`);
    };


    useEffect(() => {
        fetch('https://64ac2fad9edb4181202f3f23.mockapi.io/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((item) => (
                        <Grid item xs={2} sm={4} md={4} key={item.id}>
                            <Card sx={{ maxWidth: 345 }} key={item.id}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={item.img}
                                    title={item.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleDetail(item.id)}>Detail</Button>
                                </CardActions>
                            </Card>
                            {/* <Item key={item.id}>

                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <img src={item.img} alt={item.title} />
                                <button onClick={() => handleDetail(item.id)}>Detail</button>
                            </Item> */}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Home;
