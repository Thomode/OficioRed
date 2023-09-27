import React, { useState } from "react";
import "./Login.css";
import img from "../../assets/mesh-gradient.png";
import logo from "../../assets/logo.png";
import google from "../../assets/google.svg";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <section className="container">
            <div className="image-section">
                <div className="image-wrapper">
                    <img src={img} alt="" />
                </div>
                <div className="content-container">
                    <h1 className="section-heading">
                        Somos <span>OficioRed</span>
                    </h1>
                    <p className="section-paragraph">
                        El sistema que te permite encontrar profesionales de confianza para el hogar.
                    </p>
                </div>
            </div>
            <div className="form-section">
                <div className="form-wrapper">
                    <div className="logo-container">
                        <a href="#" className="logo-container">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                    <h2>Bienvenido! 👋🏻</h2>
                    <p>Ingresa tus credenciales para acceder a tu cuenta</p>
                    <div className="input-container">
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" id="email" autoComplete="on" className="input-field" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="input-field"
                                />
                                <button onClick={togglePasswordVisibility}>
                                    {showPassword ? (
                                        <RemoveRedEyeRoundedIcon fontSize="small" />
                                    ) : (
                                        <VisibilityOffRoundedIcon fontSize="small" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="remember-forgot">
                        <div className="remember-me">
                            <input
                                type="checkbox"
                                defaultValue="remember-me"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Recordar mis credenciales</label>
                        </div>
                        <a href="#">Olvidaste tu contraseña?</a>
                    </div>
                    <button className="login-btn">Iniciar Sesión</button>
                    <div className="or-divider">o</div>
                    <button className="google-signin">
                        <img src={google} alt="Google Logo" className="google_img" />
                        <span>Iniciar sesión con Google</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export { Login };