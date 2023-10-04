import React, { useState } from "react";
import "./Login.css";
import img from "../../assets/mesh-gradient.png";
import logo from "../../assets/logo.png";
import google from "../../assets/google.svg";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useForm } from "react-hook-form";
import accesoService from "../../services/acceso.service";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const { register, handleSubmit, formState: {errors}} = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const onSubmit = async (data) => {
        const res = await accesoService.login(data.usuario, data.password)
        console.log("Token: " + res.data)
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                <label htmlFor="email">Usuario</label>
                                <input type="text" autoComplete="on" className="input-field" {...register('usuario', {required:true})} />
                                {errors.usuario && <p>Se requiere</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className="input-field"
                                        {...register('password', {required:true})}
                                    />
                                    <button onClick={togglePasswordVisibility}>
                                        {showPassword ? (
                                            <RemoveRedEyeRoundedIcon fontSize="small" />
                                        ) : (
                                            <VisibilityOffRoundedIcon fontSize="small" />
                                        )}
                                    </button>
                                    {errors.password && <p>Se requiere</p>}
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
                        <button type="submit" className="login-btn">Iniciar Sesión</button>
                        <div className="or-divider">o</div>
                        <button className="google-signin">
                            <img src={google} alt="Google Logo" className="google_img" />
                            <span>Iniciar sesión con Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
