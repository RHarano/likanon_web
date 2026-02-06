import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

// X API クライアントの初期化
const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

// 読み書き可能なクライアント
export const rwClient = client.readWrite;

// アカウント情報
export const ACCOUNT = '@likanon_web';

// サイトURL
export const SITE_URL = 'https://likanon.com';

export default client;
