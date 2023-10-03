import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

export default function CardProfesional() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="profesional"
                height="140"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Bordino, Tobías
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Profesional Electricista Matriculado
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Guardar</Button>
                <Button size="small">Leer más</Button>
            </CardActions>
        </Card>
    );
}