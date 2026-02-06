// 指定した内容を投稿
import { rwClient } from './config.js';

async function postTweet(text) {
    if (!text) {
        console.error('❌ 投稿内容を指定してください');
        console.log('\n使い方:');
        console.log('  node post.js "投稿したい内容"');
        process.exit(1);
    }

    // 文字数チェック
    if (text.length > 280) {
        console.error(`❌ 文字数オーバー: ${text.length}文字 (上限280文字)`);
        process.exit(1);
    }

    console.log('📝 投稿内容:');
    console.log('─'.repeat(40));
    console.log(text);
    console.log('─'.repeat(40));
    console.log(`文字数: ${text.length}/280\n`);

    try {
        console.log('🔄 投稿中...');
        const tweet = await rwClient.v2.tweet(text);

        console.log('\n✅ 投稿成功!');
        console.log(`🔗 https://twitter.com/likanon_web/status/${tweet.data.id}`);

        return tweet;
    } catch (error) {
        console.error('\n❌ 投稿エラー:', error.message);

        if (error.code === 403) {
            console.error('→ 重複投稿の可能性があります');
        }

        process.exit(1);
    }
}

// コマンドライン引数から投稿内容を取得
const text = process.argv[2];
postTweet(text);
