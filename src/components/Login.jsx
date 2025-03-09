import './styles.css'
import { Input } from "@material-tailwind/react";

export function Login() {
    return (
        <div className="flex flex-col justify-self-center">
            <div>Log In</div>
            <div className='flex flex-col justify-self-center gap-6'>
                <div>LOGO</div>
                <Input variant="outlined" placeholder="Usuario"></Input>
                <Input type="password" variant='outlined' placeholder='Contraseña'></Input>
                <div>Contraseña</div>
                <div>Iniciar Sección</div>
                <div>¿Olvidaste tu contraseña?</div>
            </div>
            <div>Registrarme</div>
        </div>
    )
}
