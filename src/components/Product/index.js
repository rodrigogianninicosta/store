import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

function Product({product, product2}) {
    const [disp, setDisp] = useState('')
    const [disp2, setDisp2] = useState('')
    const [content, setContent] = useState([])
    const [content2, setContent2] = useState([])
    var num = 0
    var times = [...Array(product2.length % 4 !== 0 ? parseInt(product2.length/4) + 1 : parseInt(product2.length/4))]

    useEffect(() => {
        setContent(product)
        setContent2(product2)
    }, [product, product2])
    useEffect(() => {
        setDisp('flex')
        setDisp2('none')
    }, [])

    return (
        <div className="product-container" style={{height: 16 + (((times.length + 1)) * 44) + 'vh'}}> 
            <div className="product">   
                <div className="plus" style={{ display: disp}} onClick={()=>{
                    setDisp('none') 
                    setDisp2('flex')
                }}>
                    <img src={'/images/icons/plus-line.svg'} alt='plus-icon'/>
                    <label>Adicionar produto</label>
                </div>
                <div className="plus" style={{ display: disp2}}>
                    <label>Nome do produto</label>
                    <input type={'text'}/>
                    <label>Quantidade</label>
                    <input type={'text'}/>
                    <label>Valor</label>
                    <input type={'text'}/>
                    <button onClick={()=>{
                        setDisp('flex')
                        setDisp2('none')
                        if(document.getElementsByTagName("input")[0].value !== '' &&
                           document.getElementsByTagName("input")[1].value !== '' &&
                           document.getElementsByTagName("input")[2].value !== '')
                        {
                            axios({
                                method: 'post',
                                url: `http://localhost:8080/addProduct`,
                                headers: {},
                                data: {
                                    "name": document.getElementsByTagName("input")[0].value,
                                    "quantity": document.getElementsByTagName("input")[1].value,
                                    "price": document.getElementsByTagName("input")[2].value
                                }
                            })
                        }
                        document.getElementsByTagName("input")[0].value = ''
                        document.getElementsByTagName("input")[1].value = ''
                        document.getElementsByTagName("input")[2].value = ''
                    }}><label>Salvar</label></button>
                </div>
                {
                    content.map((content, index) => {
                        return(
                            <div className="plus" key={'3'+ index + '1'}>
                                <div onClick={() => axios.delete(`http://localhost:8080/delete/${content.id}`)}>
                                    <img src={`/images/icons/close-line.svg`} alt='gargabe-icon'/>
                                </div>
                                <img  src={`/images/icons/${content.name}.svg`} alt='fruit-icon' onClick={()=>alert(`${content.name}`)}/>
                                <label>{content.name}</label>
                                <label>Unidades: {content.quantity}</label>
                                <label>R$ {content.price}</label>
                            </div>
                        )
                    })
                }
            </div>
            {
                times.map((index) => {
                    num +=4
                    return (
                        <div className="product" key={index + 'g'}>
                        {
                            content2.slice(num-4,num).map((content, index) => {
                                return(
                                    <div className="plus" key={index + 'a'}>
                                        <div onClick={() => axios.delete(`http://localhost:8080/delete/${content.id}`)}>
                                            <img src={`/images/icons/close-line.svg`} alt='gargabe-icon'/>
                                        </div>
                                        <img src={`/images/icons/${content.name}.svg`} alt='fruit-icon'onClick={()=>alert(`${content.name}`)}/>
                                        <label>{content.name}</label>
                                        <label>Unidades: {content.quantity}</label>
                                        <label>R$ {content.price}</label>
                                    </div>
                                )
                            })
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Product;