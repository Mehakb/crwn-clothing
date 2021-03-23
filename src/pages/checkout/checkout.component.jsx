import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartItem from "../../components/cart-item/cart-item.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
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
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);