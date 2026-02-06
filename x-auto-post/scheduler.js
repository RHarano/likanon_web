// 自動投稿スケジューラー
import cron from 'node-cron';
import { rwClient } from './config.js';
import { getAllPosts } from './posts-content.js';
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
        console.warn('⚠️ ログファイル読み込みエラー');
    }
    return { posted: [] };
}

// 投稿済みログを保存
function savePostedLog(log) {
    fs.writeFileSync(POSTED_LOG_FILE, JSON.stringify(log, null, 2));
}

// まだ投稿していない投稿を取得
function getUnpostedPost() {
    const log = loadPostedLog();
    const postedIds = log.posted.map(p => p.id);
    const allPosts = getAllPosts();

    const unposted = allPosts.filter(p => !postedIds.includes(p.id));

    if (unposted.length === 0) {
        console.log('📭 全投稿が完了。ログをリセットします。');
        log.posted = [];
        savePostedLog(log);
        return allPosts[Math.floor(Math.random() * allPosts.length)];
    }

    return unposted[Math.floor(Math.random() * unposted.length)];
}

// 投稿実行
async function executePost() {
    const post = getUnpostedPost();
    const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    console.log(`\n${'='.repeat(50)}`);
    console.log(`⏰ ${now}`);
    console.log(`📝 投稿ID: ${post.id}`);
    console.log('─'.repeat(50));
    console.log(post.text);
    console.log('─'.repeat(50));

    try {
        const tweet = await rwClient.v2.tweet(post.text);

        // ログに記録
        const log = loadPostedLog();
        log.posted.push({
            id: post.id,
            tweetId: tweet.data.id,
            postedAt: new Date().toISOString(),
        });
        savePostedLog(log);

        console.log('✅ 投稿成功!');
        console.log(`🔗 https://twitter.com/likanon_web/status/${tweet.data.id}`);
    } catch (error) {
        console.error('❌ 投稿エラー:', error.message);
    }
}

// スケジュール設定
// デフォルト: 毎日 9:00, 12:00, 18:00 に投稿
const SCHEDULE = {
    morning: '0 9 * * *',    // 毎日 9:00
    noon: '0 12 * * *',      // 毎日 12:00
    evening: '0 18 * * *',   // 毎日 18:00
};

console.log('🚀 LIKaNON X自動投稿スケジューラー起動');
console.log('📅 スケジュール:');
console.log('   - 毎日 9:00 (朝)');
console.log('   - 毎日 12:00 (昼)');
console.log('   - 毎日 18:00 (夕)');
console.log('\n⏳ 次の投稿時間まで待機中...');
console.log('   (Ctrl+C で停止)\n');

// 各時間帯にスケジュール設定
cron.schedule(SCHEDULE.morning, () => {
    console.log('🌅 朝の投稿を実行');
    executePost();
}, { timezone: 'Asia/Tokyo' });

cron.schedule(SCHEDULE.noon, () => {
    console.log('☀️ 昼の投稿を実行');
    executePost();
}, { timezone: 'Asia/Tokyo' });

cron.schedule(SCHEDULE.evening, () => {
    console.log('🌆 夕方の投稿を実行');
    executePost();
}, { timezone: 'Asia/Tokyo' });

// プロセスを維持
process.on('SIGINT', () => {
    console.log('\n\n👋 スケジューラーを停止しました');
    process.exit(0);
});
