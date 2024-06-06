import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getCarouselPhotos } from '../services/workoutService'; 

const HomePage: React.FC = () => {
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const photosData = await getCarouselPhotos(); 
                setPhotos(photosData);
            } catch (error) {
                console.error('Error fetching carousel photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Workout Reservations
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Book your workouts with ease and reach your fitness goals!
            </Typography>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                interval={5000}
                stopOnHover={true}
                className="carousel"
            >
               {photos.map((photo, index) => (
                    <div key={index}>
                        <img src={photo} alt={`Workout ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Explore Workouts
                            </Typography>
                            <Typography variant="body2">
                                Discover a wide range of workouts tailored to your fitness level and interests.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Professional Trainers
                            </Typography>
                            <Typography variant="body2">
                                Train with certified trainers who will guide you on your fitness journey.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Manage Your Profile
                            </Typography>
                            <Typography variant="body2">
                                Update your personal information, track your progress, and more.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
