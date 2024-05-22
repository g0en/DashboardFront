import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: '16px auto',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
  },
});

const StyledButton = styled(Button)({
  color: '#581845',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: '#581845',
    color: '#fff',
    transform: 'scale(1.1)',
  },
});

interface Content {
  url: string;
  title: string;
  content: string;
}

const InicioCard: React.FC<{ content: Content }> = ({ content }) => {
  const { url, title, content: cardContent } = content;
  return (
    <StyledCard>
      <CardMedia
        sx={{ height: 140 }}
        image={url}
        title={title}
      />
      <CardContent style={{ backgroundColor: "#FFF4DC" }}>
        <Typography gutterBottom variant="h5" component="div" >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardContent}
        </Typography>
      </CardContent>
      <CardActions style={{ backgroundColor: "#FFF4DC" }} >
        <Link to={`/${title}`} style={{ textDecoration: 'none' }} >
          <StyledButton size="small">Ver más</StyledButton>
        </Link>
      </CardActions>
    </StyledCard>
  );
}

export default InicioCard;
