import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '7867983038:AAFMN6j37pmeRmpKp4U-PLGro615wX3-lNQ';
const CHAT_ID = '-1002291698548';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone } = req.body;

    try {
      const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: `Заявка на консультацию от ${name}:n${phone}`,
      });

      if (response.data.ok) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ success: false, error: 'Ошибка отправки сообщения' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
