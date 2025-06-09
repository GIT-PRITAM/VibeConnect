import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Custom Orange Theme
const orangeTheme = createTheme({
    palette: {
        primary: {
            main: '#FF9839',
        },
        secondary: {
            main: '#e67614',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
    },
});

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handelAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let message = (err.response?.data?.message || "Something went wrong");
            setError(message);
        }
    };

    return (
        <ThemeProvider theme={orangeTheme}>
            <Grid
                container
                component="main"
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0F2027', //  Dark blue from HomeComponent
                }}
            >
                <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={10}
                    square
                    sx={{
                        borderRadius: 4,
                        padding: 4,
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#FF9839' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5" fontWeight={600}>
                            {formState === 0 ? 'Welcome Back' : 'Create Account'}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                            <Button
                                variant={formState === 0 ? 'contained' : 'outlined'}
                                onClick={() => setFormState(0)}
                                sx={{
                                    backgroundColor: formState === 0 ? '#FF9839' : 'transparent',
                                    color: formState === 0 ? '#fff' : '#FF9839',
                                    borderColor: '#FF9839',
                                    '&:hover': {
                                        backgroundColor: '#e67614',
                                        color: '#fff',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : 'outlined'}
                                onClick={() => setFormState(1)}
                                sx={{
                                    backgroundColor: formState === 1 ? '#FF9839' : 'transparent',
                                    color: formState === 1 ? '#fff' : '#FF9839',
                                    borderColor: '#FF9839',
                                    '&:hover': {
                                        backgroundColor: '#e67614',
                                        color: '#fff',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User name"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <Typography color="error">{error}</Typography>}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: '#FF9839',
                                    '&:hover': {
                                        backgroundColor: '#e67614',
                                    },
                                }}
                                onClick={handelAuth}
                            >
                                {formState === 0 ? "Log In" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={4000} message={message} />
        </ThemeProvider>
    );
}

