// import { NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';


// if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
//   throw new Error('Missing Gemini API key');
// }

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { question, context } = body;

//     if (!question || !context) {
//       return NextResponse.json(
//         { error: 'Question and context are required' },
//         { status: 400 }
//       );
//     }

//     const prompt = `${context}\n\nQuestion: ${question}`;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return NextResponse.json({ response: text });
//   } catch (error: unknown) {
//     console.error('Error processing chat:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to process request',
//         details: process.env.NODE_ENV === 'development' ? error.message : undefined 
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, context } = body;

    if (!question || !context) {
      return NextResponse.json(
        { error: 'Question and context are required' },
        { status: 400 }
      );
    }

    const prompt = `${context}\n\nQuestion: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error processing chat:', error);
      return NextResponse.json(
        {
          error: 'Failed to process request',
          details:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details:
          process.env.NODE_ENV === 'development' ? 'Unknown error' : undefined,
      },
      { status: 500 }
    );
  }
}
