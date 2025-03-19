import './styles.css';
import React from 'react';
import Humboldt from '../assets/humboldt.jpeg';
import LomaSerrano from '../assets/lomaserrano.jpeg';
import Paisaje from '../assets/paisaje.jpeg';
import Selva from '../assets/selva.jpeg';
import Selva2 from '../assets/selva2.jpeg';
import Torre from '../assets/torre.jpeg';

export default function Galeria() {

    return(
        <div>
            <div className='flex flex-row bg-amber-50 items-center rounded-lg justify-center gap-20'> 
                <img src={Humboldt} alt="humboldt" className='size-200 my-15' />
                <img src={LomaSerrano} alt="lomaSerrano" className='size-200 my-15'/>
            </div>
            <div className='flex flex-row bg-amber-50 rounded-lg justify-center gap-20'> 
                <img src={Paisaje} alt="paisaje" className='size-200 my-15'/>
                <img src={Selva} alt="selva" className='size-200 my-15 shrink'/>
            </div>
            <div className='flex flex-row bg-amber-50 rounded-lg justify-center gap-20'> 
                <img src={Selva2} alt="selva2" className='size-200 my-15'/>
                <img src={Torre} alt="torre" className='size-200 my-15 shrink'/>
            </div>
        </div>
    )
}
