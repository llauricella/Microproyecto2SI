import logoImg from '../assets/logo.png'; 
import './styles.css'


function Login() {
    return (
        <div className="flex flex-col justify-self-center min-h-screen">
            <div className='bg-white m-5 rounded-md p-10 text-center text-3xl font-bold'>Log In</div>
            <div className='flex flex-col justify-self-center gap-6 bg-white rounded-md p-10'>
                <img src={logoImg} alt="Logo" className='border-2 rounded-lg'/>
                <input className="p-1 border-2 rounded-md" type="text" placeholder='User'/>
                <input className="p-1 border-2 rounded-md" type="Password" placeholder='Contraseña'/>
                <button className='bg-black text-emerald-700 rounded-md p-2 cursor-pointer font-bold'>Iniciar Sección</button>
                <a href="" className='text-center'>¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    )
}

export default Login;