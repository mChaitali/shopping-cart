import { useCart } from "../../context/CartContext";
import { Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import { formatNumberUtils } from "../../utils"

const CartItem = ({ product, quantity }) => {
const {dispatch} = useCart();
    return (
        <div className="flex itens-center justify-between gap-3" data-testid="cart-item">
            {/* Product image */}
            <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 rounded border-[#dad4d4] p-2"/>

            {/* Details */}
            <div className="flex-3 text-left">
                <h3 className="font-medium">{product.title}</h3>
                <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={()=> dispatch({type:"DECREASE_QTY", payload: product.id})} data-testid="quantity-decrease">
                    -
                </Button>
                <span className="px-2 w-10 text-center" data-testid="product-quantity">{quantity}</span>
                <Button variant="outline" size="sm" onClick={()=> dispatch({type:"INCREASE_QTY", payload: product.id})} data-testid="quantity-increase">
                    +
                </Button>
            </div>
            </div>

            {/* Quantity controls */}
            <div className="flex-1.5 text-end"> 
            <button onClick={()=> dispatch({type:"REMOVE_QTY", payload: product.id})}
                    className="px-2 py-1 rounded hover:bg-gray-100"
                    data-testid="delete-item">
                    <Trash2 />
                </button>
                <p className="text-gray-500 text-xs">${formatNumberUtils(product.price)} * {quantity}</p>
                <p className="font-semibold text-sm" data-testid="item-price">${formatNumberUtils(product.price * quantity)}</p>
            </div>
        </div>
    )
}

export default CartItem;

