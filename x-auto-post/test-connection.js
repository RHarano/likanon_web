// X API 接続テスト
import { rwClient, ACCOUNT } from './config.js';

async function testConnection() {
    console.log('🔄 X API 接続テスト中...\n');

    try {
        // 自分のアカウント情報を取得
        const me = await rwClient.v2.me();

        console.log('✅ 接続成功!\n');
        console.log('📱 アカウント情報:');
        console.log(`   ユーザー名: @${me.data.username}`);
        console.log(`   表示名: ${me.data.name}`);
        console.log(`   ID: ${me.data.id}`);

        if (me.data.username !== ACCOUNT.replace('@', '')) {
            console.log(`\n⚠️  注意: 設定アカウント(${ACCOUNT})と異なります`);
        }

        console.log('\n🎉 APIの設定が正しく完了しています!');
        console.log('   npm run post で投稿できます');

    } catch (error) {
        console.error('❌ 接続エラー:\n');

        if (error.code === 401) {
            console.error('認証エラー: APIキーまたはトークンが無効です');
            console.error('→ .env ファイルの設定を確認してください');
        } else if (error.code === 403) {
            console.error('権限エラー: アプリの権限が不足しています');
            console.error('→ X Developer Portalでアプリ権限を確認してください');
        } else {
            console.error('エラー詳細:', error.message);
        }

        process.exit(1);
    }
}

testConnection();
