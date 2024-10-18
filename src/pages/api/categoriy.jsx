import React, { useState } from 'react';
import Cors from 'cors';
import initMiddleware from '../../app/lib/init-middleware'; // создадим этот файл позже
import axios from 'axios';

// import { useCart } from '../context/CartProvider';
// import initMiddleware from '@/app/lib/init-middleware';

const cors = initMiddleware( 
    Cors({
        methods:['GET', 'POST', 'OPTIONS'],
    })
)

export default async function handler(req, res) {
    await cors(req,res)

    if(req.method === 'GET') {
        console.log(req.query);
        const {value} = req.query;
        try {
            const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=${value}`, {
                headers: {
                    'Authorization': 'Bearer a7ef8af7d85be3c8cf29236ff11f74c7ab20a89c',
                    'Accept-Encoding': 'gzip',
                },
                params: {
                    expand: 'images, attributes',
                    limit: 100,
                    // fields: 'stock', // Добавляем параметр fields
                },

            });
            res.status(200).json(response.data)
        } catch(error) {
            console.error('ошибка:', error);
            res.status(500).json({error: 'ошибка'});

        }finally {
            console.log('Мы тут ');
        }
    } else{
        res.setHeader('ALLOW', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`)
        console.log('errs');
    }
}