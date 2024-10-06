import axios from "axios";
import Productpages from "../components/Productpages";
import Breadcrumbs from "../components/Breadcrumbs";
import { useCart } from "../context/CartProvider";

export async function getStaticPaths() {
    try {
        const response = await fetch('/api/products'); // замените на ваш путь
        const data = response.data;
        console.log(data);

        const paths = data.rows.map(product => ({
            params: { id: product.code.toString() },
        }));

        console.log(paths);

        return { paths, fallback: false };
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch('/api/products');// замените на ваш путь
        const data = response.data;
        console.log(data);
        const product = data.rows.find(i => i.code === params.id) || null; // Если продукт не найден, возвращаем null

        return { props: { product } };
    } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
        return { props: { product: null } };
    }
    // return { props: { product: response.data } };
}

const ProductPage = ({ product }) => {

    const breadcrumbsItems = [
        { title: 'Home', link: '/' },
        { title: product.name, link: `/product/${product.code}` }
    ];

    // const { toggleCartItem } = useCart();
    // const [productList, setProductList] = useState([]);
    // const handleAddToCart = () => {
    //     toggleCartItem(product); // Вызываем функцию при добавлении товара
    // };

    // getProducts();
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const products = await getProducts(); // Предполагается, что getProducts возвращает массив продуктов
    //         setProductList(products);
    //     };

    //     fetchProducts();
    // }, []); // П

    if (!product) {
        return <div>Продукт не найден</div>; // Обработка случая, когда продукт не найден
    }

    return (
        <>
            {/* <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <Productpages
                    product={product}
                    // toggleCartItem={toggleCartItem}
                />

            </div> */}
            <div>fjsklfd</div>



        </>
    );
};

export default ProductPage;