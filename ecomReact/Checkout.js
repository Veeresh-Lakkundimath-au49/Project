import React from 'react'

const Checkout = () => {

    function handleSubmit(){
        window.alert("Payment successful! Your order will be delivered in the next 2 days")
    }

  return (
    <div className='signup'>
    <div>Checkout</div>
    
    <div><h1>Please Enter Shipping details</h1></div>

    <form  encType="application/x-www-form-urlencoded">
    <div>
        <div>
        <label for="address">Shipping Address</label>
        </div>
        <textarea type="text" id="name" required ></textarea>
        </div>

    <div>
        <div>
        <label for="password">Card details</label>
        </div>
        <input type="text" id="number" required />
    </div>


    <div>
    <button type="submit" onClick={handleSubmit}>Pay now!</button>
    </div>
    </form>

    </div>
  )
}

export default Checkout