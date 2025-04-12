import { OpenAI } from 'openai'; // Или другой SDK (DeepSeek)

export default async function handler(req, res) {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal, level } = req.body;

  // Инициализация API (пример для OpenAI, для DeepSeek аналогично)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Ключ из окружения Vercel
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Создай план тренировок для цели: ${goal}, уровень: ${level}. 
                    Ответь в формате HTML без CSS.`
        }
      ],
      temperature: 0.7,
    });

    const plan = response.choices[0]?.message?.content;
    res.status(200).json({ plan });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Ошибка генерации плана' });
  }
}

export const config = {
  runtime: 'edge', // Для Edge Function (быстрее)
  // runtime: 'nodejs' // Для стандартной Serverless Function
};