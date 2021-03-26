import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IYyJWSJZvMGM1WnjBsQ4wq3yLFuze4J0qBOWcVWyEuTiiCz5gBL20eMoc9MRNVQRQ9TRfF3CY4V2BiyT2QEmMnC00EmAYzJm8"

    const onToken = token => {
        console.log(token);
        alert("Payment Successful")
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/en/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;