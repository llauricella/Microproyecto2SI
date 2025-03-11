import './styles.css'

function Header() {
    return (
        <div className='flex flex-row justify-center'>
            <button className='flex-none block cursor-pointer bg-white rounded-lg m-10'><img className= 'size-20 m-6' src="https://www.svgrepo.com/show/509382/menu.svg" alt="menuLogo" /></button>
            <div className="flex-auto text-center text-5xl m-15 font-sans font-bold">ÁVILA GUIDE</div>
            <div className="flex-none block"><img className="m-10" src="https://www.unimet.edu.ve/wp-content/uploads/2023/07/Logo-footer.png" alt="unimetLogo" /></div>
        </div>
    )
}

export default Header;