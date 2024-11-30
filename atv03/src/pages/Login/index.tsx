import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo/logo.svg';

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { BlueButton, CardPaper } from '../../components/customMUI';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (evento: React.FormEvent) => {
        evento.preventDefault();
        navigate('/Produtos');
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <main className="login">
            <CardPaper elevation={3} square={false} className="cardp-login">
                <div className="logo">
                    <img src={logo} className="logo-img" alt="PetLovers Logo" />
                    <h2 className="logo-name">PetLovers</h2>
                </div>

                <div className="login-subtitle">
                    <span className="subtitle">LOGIN</span>
                    <span className="text-low-opacity">Insira suas credenciais para acessar a aplicação</span>
                </div>

                <form className="login" onSubmit={handleSubmit}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField id="email" label="Email" variant="outlined" />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'esconder senha' : 'mostrar senha'}
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                        />
                    </FormControl>

                    <BlueButton variant="contained" className="large-btn btn-azul" type="submit">
                        LOGIN
                    </BlueButton>
                </form>
            </CardPaper>
        </main>
    );
};

export default Login;
