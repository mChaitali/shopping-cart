import { useProduct } from "../hooks/useProduct";
import ProductCard from "../components/ProductCard/ProductCard";

const ProductListingPage =()=> {
    const {products, loading, error} = useProduct();

    if(loading) return <p className="p-4 flex justify-center">Loading Products...</p>;
    if(error) throw new Error(error);

    return (
        <div className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">      
            {products.map((product)=>(
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
export default ProductListingPage;