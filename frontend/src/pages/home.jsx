import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import RestoreIcon from '@mui/icons-material/Restore';
import { Button, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import '../App.css';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode);
        navigate(`${meetingCode}`);
    };

    return (
        <div className="homeContainer">
            <div className="navBar">
                <h2 className="brandTitle">VibeConnect</h2>
                <div className="navActions">

                    <Button
                        variant="contained"
                        onClick={() => navigate("/history")}
                        startIcon={<RestoreIcon />}
                        style={{
                            backgroundColor: '#FF9839',
                            color: 'white',
                            marginRight: '16px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            boxShadow: '0 4px 12px rgba(255, 152, 57, 0.4)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#e67c1a';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF9839';
                        }}
                    >
                        History
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        style={{ color: "white", borderColor: "white" }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="homeMainSection">
                <div className="homeLeftPanel">
                    <h2 style={{ color: "white", marginBottom: "20px" }}>
                        Vibe together. Anytime, anywhere.
                    </h2>
                    <div className="joinMeetingControls">
                        <TextField
                            onChange={(e) => setMeetingCode(e.target.value)}
                            value={meetingCode}
                            id="meeting-code"
                            label="Meeting Code"
                            variant="outlined"
                            InputProps={{
                                style: { color: "white", borderColor: "#3c4b5d" },
                            }}
                            InputLabelProps={{
                                style: { color: "#aaaaaa" },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#3c4b5d',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            style={{
                                backgroundColor: '#FF9839',
                                color: 'white',
                                marginLeft: '12px',
                            }}
                        >
                            Join
                        </Button>
                    </div>
                </div>

                <div className="homeRightPanel">
                    <img src="logo3.png" alt="Illustration" />
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);
