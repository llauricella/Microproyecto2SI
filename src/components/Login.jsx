import './styles.css'

export function Login() {
    return (
        <div className="flex flex-col justify-self-center">
            <div>Log In</div>
            <div className='flex flex-col justify-self-center gap-6'>
                <div>LOGO</div>
                <input variant="outlined" placeholder="Usuario"></input>
                <input type="password" variant='outlined' placeholder='Contraseña'></input>
                <div>Contraseña</div>
                <div>Iniciar Sección</div>
                <div>¿Olvidaste tu contraseña?</div>
            </div>
            <div>Registrarme</div>
        </div>
    )
}
