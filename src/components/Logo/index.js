import './style.css'

function Logo() {
    return (
        <div className="logo-container">
            <div>
                <img src={'/images/icons/shop-vendor.svg'} alt='shop-icon'/>
                <h1>YouFruit</h1>
            </div>
        </div>
    )
}

export default Logo;