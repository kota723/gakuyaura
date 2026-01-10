// 1. microCMSの設定情報
const serviceDomain = "seniormate1";
const apiKey = "5NktcNmkaRcjELDE8KN0krYXRWgu7x2mCO3U"; // 「1個のAPIキー」メニューから取得してください
const endpoint = "member"; // スクリーンショットの「エンドポイント」に基づきます
// 2. データを取得する関数
async function fetchMembers() {
    try {
        const response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`, {
            headers: {
                "X-MICROCMS-API-KEY": apiKey
            }
        });

        if (!response.ok) {
            throw new Error('データの取得に失敗しました');
        }

        const data = await response.json();
        displayMembers(data.contents);
    } catch (error) {
        console.error("エラー:", error);
        document.getElementById('member-list').innerHTML = "<p>データの読み込みに失敗しました。</p>";
    }
}

// 3. 画面に表示する関数
function displayMembers(members) {
    const container = document.getElementById('member-list');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        // 写真がある場合はそのURLを、ない場合はダミー画像を表示
        const photoUrl = member.photo ? member.photo.url : 'images/default-avatar.png';

        card.innerHTML = `
            <div class="member-image">
                <img src="${photoUrl}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name || '名前なし'}</h3>
                <p class="member-branch">${member.branch_info || ''}</p>
                <p class="member-history">シニア歴: ${member.senior_history || ''}</p>
                <p class="member-message">${member.message || ''}</p>
                ${member.Instagram_url ? `<a href="${member.Instagram_url}" target="_blank" class="instagram-link">Instagram</a>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// 実行
fetchMembers();
