import React, { useState } from 'react';
import CardItem from '../components/CardItem';

export default function Popular({mas}) {

    const [count, setCount] = useState(3);

    const handleShowMore = () => {
        setCount(count + 4);
        // Поскольку будем показывать товаров
    };

    return (
        <>
            {/* <div className="card_items"> */}
                {mas.slice(0, count).map(product => (
                    <CardItem key={product.id} product={product} />
                ))}
            {/* </div> */}

            {
                count < mas.length && (
                    <div onClick={handleShowMore} className="btn card_btn">Показать еще</div>
                )
            }
        </>

    )
}
