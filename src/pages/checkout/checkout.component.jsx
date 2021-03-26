import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartItem from "../../components/cart-item/cart-item.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import "./checkout.styles.scss"

const CheckoutPage = ({ cartItems, total }) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block"></div>
            <span>Product</span>
            <div className="header-block"></div>
            <span>Description</span>
            <div className="header-block"></div>
            <span>Quantity</span>
            <div className="header-block"></div>
            <span>Price</span>
            <div className="header-block"></div>
            <span>Remove</span>
        </div>
        {cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)}
        <div className="total">
            <span>Total:${total}</span>
        </div>
        <div className="test-warning">
            *Please use the following card details for test payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);