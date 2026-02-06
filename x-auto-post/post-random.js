// ランダムに投稿を選んで投稿
import { rwClient } from './config.js';
import { getRandomPost, getRandomPostByCategory, getAllPosts } from './posts-content.js';
import fs from 'fs';

const POSTED_LOG_FILE = './posted-log.json';

// 投稿済みログを読み込み
function loadPostedLog() {
    try {
        if (fs.existsSync(POSTED_LOG_FILE)) {
            const data = fs.readFileSync(POSTED_LOG_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.warn('⚠️ ログファイル読み込みエラー、新規作成します');
    }
    return { posted: [] };
}

// 投稿済みログを保存
function savePostedLog(log) {
    fs.writeFileSync(POSTED_LOG_FILE, JSON.stringify(log, null, 2));
}

// まだ投稿していない投稿を取得
function getUnpostedPost(category = null) {
    const log = loadPostedLog();
    const postedIds = log.posted.map(p => p.id);

    let posts;
    if (category) {
        const { getPostsByCategory } = require('./posts-content.js');
        posts = getPostsByCategory(category);
    } else {
        posts = getAllPosts();
    }

    const unposted = posts.filter(p => !postedIds.includes(p.id));

    if (unposted.length === 0) {
        console.log('📭 全ての投稿が投稿済みです。ログをリセットします。');
        log.posted = [];
        savePostedLog(log);
        return posts[Math.floor(Math.random() * posts.length)];
    }

    return unposted[Math.floor(Math.random() * unposted.length)];
}

async function postRandom(category = null) {
    const post = getUnpostedPost(category);

    if (!post) {
        console.error('❌ 投稿する内容がありません');
        process.exit(1);
    }

    console.log(`📝 選択された投稿 (ID: ${post.id}):`);
    console.log('─'.repeat(40));
    console.log(post.text);
    console.log('─'.repeat(40));
    console.log(`文字数: ${post.text.length}/280\n`);

    try {
        console.log('🔄 投稿中...');
        const tweet = await rwClient.v2.tweet(post.text);

        // 投稿済みログに追加
        const log = loadPostedLog();
        log.posted.push({
            id: post.id,
            tweetId: tweet.data.id,
            postedAt: new Date().toISOString(),
        });
        savePostedLog(log);

        console.log('\n✅ 投稿成功!');
        console.log(`🔗 https://twitter.com/likanon_web/status/${tweet.data.id}`);

        return tweet;
    } catch (error) {
        console.error('\n❌ 投稿エラー:', error.message);
        process.exit(1);
    }
}

// コマンドライン引数からカテゴリを取得（オプション）
const category = process.argv[2] || null;

if (category) {
    console.log(`📂 カテゴリ: ${category}\n`);
}

postRandom(category);
