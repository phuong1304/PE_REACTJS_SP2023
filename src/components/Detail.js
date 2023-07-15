

import '../App.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const ExpandMore = styled((props) => {

    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {

    const { id } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`https://64ac2fad9edb4181202f3f23.mockapi.io/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, [id]);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div className='detail'>
            <Card >
                <CardHeader

                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={products.title}
                    subheader={products.views}
                />
                <CardMedia
                    component="img"

                    image={products.img}
                    alt={products.title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {products.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Content:</Typography>
                        <Typography paragraph>
                            {products.content}
                        </Typography>
                        <Typography paragraph>
                            Attractive: {products.actractive ? 'Yes' : 'No'}
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        </div>


    );
}
