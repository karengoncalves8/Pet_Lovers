import { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo/logo.svg'

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { BlueButton, CardPaper } from '../../components/customMUI';
import { withRouter } from '../../routes/withRouter';

type state = {
    showPassword: boolean
}

type props = {
    navigate: (path: string) => void;
};

class Login extends Component<props, state>{

    constructor(props: props) {
        super(props)

        this.state = {
            showPassword: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    }

    public handleSubmit(evento: any) {
        evento.preventDefault()
        this.props.navigate('/Produtos');
    }

    public handleClickShowPassword(evento: any) {
        this.setState({showPassword: !this.state.showPassword})
    }

    render() {

        return (
            <main className='login'>
                
                <CardPaper elevation={3} square={false} className='cardp-login' >
                    <div className="logo">
                        <img src={logo} className='logo-img'></img>
                        <h2 className='logo-name'>PetLovers</h2>
                    </div>

                    <div className="login-subtitle">
                        <span className='subtitle'>LOGIN</span>
                        <span className='text-low-opacity'>Insira suas credenciais para acessar a aplicação</span>
                    </div>

                    <form className="login" onSubmit={this.handleSubmit}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                        />
                    </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={this.state.showPassword ? 'esconder senha' : 'mostrar senha'}
                                            onClick={this.handleClickShowPassword}
                                            edge="end"
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Senha"
                            />
                        </FormControl>

                        <BlueButton variant="contained" className='large-btn btn-azul' type='submit'>LOGIN</BlueButton>
                    </form>

                </CardPaper>
            </main>
        )
    }
}

export default withRouter(Login);
