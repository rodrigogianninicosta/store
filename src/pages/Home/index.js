import Logo from '../../components/Logo'
import Product from '../../components/Product'
import api from '../../api'
import { useEffect, useState } from 'react';

function Home() {
    const[product, setProduct] = useState([]);
    const[product2, setProduct2] = useState([]);
    useEffect(()=>{
        api({
            url:"products"
        })
        .then(({data}) => { setProduct(data.slice(0,3)); setProduct2(data.slice(3, data.length)) }) 
    })
    return(
        <div>
            <Logo />
            <Product product={product} product2={product2}/>
        </div>
    );
}

export default Home;