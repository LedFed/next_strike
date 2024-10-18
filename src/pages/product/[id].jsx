'use client';
import axios from "axios";
import Productpages from "../../app/components/Productpages";
import Breadcrumbs from "../../app/components/Breadcrumbs";
// import { useCart } from "../../context/CartProvider";
import { useRouter } from "next/router";
import Layout from "../../app/layout";


export async function getStaticPaths() {
    try {
        const response = await axios.get('http://localhost:3000/api/products'); // замените на ваш путь
        const data = response.data;

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
        const response = await axios.get(`http://localhost:3000/api/groups?value=${encodeURIComponent(params.id)}`);// замените на ваш путь
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

    // const router = useRouter();
    // const { value } = router.query; // Извлекаем значение из query
    // const value = '392b5fd1-7dcd-11ef-0a80-05c00027a337';
    // console.log(value);
    // const [products, setProducts] = useState([]);

    // const getProducts = async (value) => {
    //     try {
    //         console.log(value);
    //         const response = await fetch(`/api/groups?value=${encodeURIComponent(value)}`);
    //         console.log(value);
    //         console.log(response);
    //         const data = await response.json();
    //         console.log(data);
    //         // setProducts(data);
    //         console.log('Вот я получаю все успешно ' + response);
    //         return data;
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //         return null;
    //     }
    // };

    // useEffect(() => {
    //     console.log(value);
    //     if (value) {
    //         const fetchProducts = async () => {
    //             const productData = await getProducts(value);
    //             console.log(productData);
    //             if (productData) {
    //                 setProducts(productData); // Предполагаем, что данные находятся в поле rows
    //                 console.log(productData);
    //             }
    //         };

    //         fetchProducts();
    //     }    
    // }, [value]);

    console.log(product);

    if (!product) {
        return <div>Продукт не найден</div>; // Обработка случая, когда продукт не найден
    }

    return (
        <>
            <div className="container">
                <Breadcrumbs items={breadcrumbsItems} />
                <Productpages
                    product={product}
                    // toggleCartItem={toggleCartItem}
                />

            </div>
            {/* <Layout> */}
                {/* <Productpages
                    product={product}

                /> */}
            {/* </Layout> */}
        </>
    );
};

export default ProductPage;