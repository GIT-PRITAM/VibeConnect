import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // Handle error
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0e1f2f', // Dark blue background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
        }}>
            <div style={{
                maxWidth: '960px',
                width: '100%',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
                boxSizing: 'border-box',
                fontFamily: "'Roboto', sans-serif"
            }}>

                <Button
                    onClick={() => routeTo("/home")}
                    variant="contained"
                    startIcon={<HomeIcon />}
                    sx={{
                        backgroundColor: '#FF9839', // pumpkin orange
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(255, 152, 57, 0.4)',
                        '&:hover': {
                            backgroundColor: '#e67c1a', // darker orange on hover
                            boxShadow: '0 6px 16px rgba(230, 124, 26, 0.6)',
                        },
                        marginBottom: '24px',
                    }}
                >
                    Home
                </Button>




                <Typography variant="h4" gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#0e1f2f',
                        marginBottom: '32px'
                    }}>
                    Meeting History
                </Typography>

                {
                    (meetings.length !== 0) ? meetings.map((e, i) => (
                        <Card key={i} variant="outlined" sx={{
                            marginBottom: '20px',
                            borderRadius: '12px',
                            border: '1px solid #FF9839',
                            backgroundColor: '#fff7f0',
                            boxShadow: '0 4px 10px rgba(255, 152, 57, 0.3)'
                        }}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: '#333333', fontSize: 16 }}>
                                    <strong>Meeting Code:</strong> {e.meetingCode}
                                </Typography>
                                <Typography sx={{ color: '#666666' }}>
                                    <strong>Date:</strong> {formatDate(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )) : (
                        <Typography sx={{ textAlign: 'center', color: '#999999' }}>
                            No meeting history found.
                        </Typography>
                    )
                }
            </div>
        </div>
    );
}

