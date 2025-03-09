import './styles.css'

function Principal() {
    return (
        <div className="grid grid-cols-4 gap-2 text-center">
            <div className="col-span-4 block rounded-lg h-130">LOGO DE AVILA</div>
            <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4 h-25">RUTAS</button>
            <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4">GUIAS</button>
            <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4">INFORMACION GENERAL</button>
            <button className="col-span-1 rounded-lg cursor-pointer block m-10 bg-amber-600 text-2xl font-bold border-black border-4">PLANES</button>
        </div>
    )
}

export default Principal;