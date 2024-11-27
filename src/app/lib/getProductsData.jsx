// app/lib/getProductsData.js
import axios from 'axios';

export const getProductsData = async () => {
    try {
        const response = await axios.get('https://api.moysklad.ru/api/remap/1.2/entity/product', {
            headers: {
                'Authorization': 'Bearer 04c229acda627c250062de4c2a82b1bc3c9293d5',
                'Accept-Encoding': 'gzip',
            },
            params: {
                expand: 'images,attributes',
                limit: 100,
                fields: 'stock',
            },
        });
        return response.data.rows; // Возвращаем только нужные данные
    } catch (error) {
        console.error('Ошибка при получении данных продуктов:', error);
        throw new Error('Не удалось получить данные продуктов');
    }
};
