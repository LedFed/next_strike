// import axios from 'axios';


// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // const { name, phone } = req.body;
//     const { type, data } = req.body;
//     let message;

//     if (type === 'consultation') {
//       const { name, phone } = data;
//       message = `Заявка на консультацию от ${name}:n${phone}`;
//     } else if (type === 'order') {
//       const { cart, totalSum, customer } = data;
//       const productsMessage = cart.map(product => {
//         return `${product.name}\n Артикул: ${product.article} - ${product.count} шт. \n по ${product.price}₽ `;
//       }).join('\n');
//       message = `${productsMessage}\n Итого: ${totalSum}₽\n Заказ сделал: ${customer.name}\n Номер телефона: ${customer.phone}`;
//     } else {
//       return res.status(400).json({ success: false, error: 'Неверный тип сообщения' });
//     }

//     try {
//       const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
//         chat_id: CHAT_ID,
//         // text: `Заявка на консультацию от ${name}:n${phone}`,
//         text: message
//       });

//       if (response.data.ok) {
//         return res.status(200).json({ success: true });
//       } else {
//         return res.status(500).json({ success: false, error: 'Ошибка отправки сообщения' });
//       }
//     } catch (error) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import https from 'https';

const TELEGRAM_BOT_TOKEN = '7867983038:AAFMN6j37pmeRmpKp4U-PLGro615wX3-lNQ';
const CHAT_ID = '-1002291698548';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, data } = req.body;
    let message;

    if (type === 'consultation') {
      const { name, phone } = data;
      message = `Заявка на консультацию от ${name}:\n${phone}`;
    } else if (type === 'order') {
      const { cart, totalSum, customer } = data;
      const productsMessage = cart.map(product => {
        return `${product.name}\n Артикул: ${product.article} - ${product.count} шт. \n по ${product.price}₽ `;
      }).join('\n');
      message = `${productsMessage}\n Итого: ${totalSum}₽\n Заказ сделал: ${customer.name}\n Номер телефона: ${customer.phone}`;
    } else {
      return res.status(400).json({ success: false, error: 'Неверный тип сообщения' });
    }

    const dataToSend = JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataToSend),
      },
    };

    const reqTelegram = https.request(options, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        const result = JSON.parse(body);
        if (result.ok) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(500).json({ success: false, error: 'Ошибка отправки сообщения' });
        }
      });
    });

    reqTelegram.on('error', (error) => {
      return res.status(500).json({ success: false, error: error.message });
    });

    reqTelegram.write(dataToSend);
    reqTelegram.end();
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

