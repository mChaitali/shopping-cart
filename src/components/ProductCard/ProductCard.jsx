import { useCart } from "../../context/CartContext";
import Button from "./../../ui/Button";
import { Star } from "lucide-react";
import { formatNumberUtils } from "../../utils";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();
  return (
    <div
      data-testid="product-card"
      className="h-full flex flex-col relative overflow-hidden border rounded-lg border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
    >

      {/* Image */}
      <div className="flex items-center justify-center h-48 overflow-hidden bg-white">
        <img
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2
          className="font-semibold text-lg mb-1 line-clamp-2"
          data-testid="product-title"
          title={product.title}
        >
          {product.title}
        </h2>
        <p 
          className="text-gray-500 text-sm mb-2 line-clamp-2"
          data-testid="product-description"
          title={product.description}
        >
          {product.description}
        </p>
        
        <div className="mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1 justify-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.rate)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <div
            className="flex items-center justify-center gap-2 mb-2"
            data-testid="product-price"
          >
            <span
              className="text-lg font-semibold"
              style={{ color: "#0D3B66" }}
            >
              ${formatNumberUtils(product.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart Button pinned at bottom */}
      <div className="px-4 pb-4">
        <Button
          data-testid="add-to-cart"
          onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
          className="w-full py-2 text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
