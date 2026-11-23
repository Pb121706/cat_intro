export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tag: string;
  cover: string;
  coverAlt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "new-cat-checklist",
    title: "第一次養貓就上手！新手必備清單",
    excerpt: "從貓砂盆到逗貓棒，迎接小山竹回家前，先把這些東西準備好，讓牠一進門就安心。",
    date: "2026-11-02",
    readMinutes: 5,
    tag: "新手指南",
    cover: "/images/hero-kitten.jpg",
    coverAlt: "舉起小爪子的小奶貓",
    sections: [
      {
        heading: "吃飯喝水的地方",
        paragraphs: [
          "準備兩個碗，一個放飼料、一個放水。陶瓷或不鏽鋼的碗比較好清洗，也比較不容易藏細菌。",
          "很多貓咪不太愛喝水，可以試試把水碗放在離飯碗遠一點的地方，或是準備一台小飲水機，流動的水更能吸引牠們。",
        ],
      },
      {
        heading: "貓砂盆與貓砂",
        paragraphs: [
          "貓砂盆最好選大一點、讓貓咪能在裡面轉一圈的尺寸。放在安靜、不吵雜的角落，牠才會願意去上廁所。",
          "貓砂有礦砂、豆腐砂、木屑砂等選擇。一開始可以先用跟原本家裡或中途相同的種類，再慢慢更換。",
        ],
      },
      {
        heading: "抓板、玩具和躲藏處",
        paragraphs: [
          "磨爪是貓咪的天性，準備一兩個貓抓板，就能保護你的沙發。",
          "剛到新家的貓咪會比較緊張，一個紙箱或小窩讓牠躲著觀察環境，是最好的安全感來源。等牠願意出來了，再用逗貓棒陪牠玩吧！",
        ],
      },
    ],
  },
  {
    slug: "cat-body-language",
    title: "讀懂貓咪的身體語言：尾巴、耳朵和眼睛在說什麼？",
    excerpt: "貓咪不會說話，但牠的尾巴、耳朵和眼神一直在跟你聊天。學會這幾個訊號，你們會更親近。",
    date: "2026-11-09",
    readMinutes: 4,
    tag: "貓咪行為",
    cover: "/images/gallery-4.jpg",
    coverAlt: "尾巴高高翹起、回頭看的橘白貓",
    sections: [
      {
        heading: "尾巴高高翹起",
        paragraphs: [
          "尾巴直直豎起、尾端微微彎曲，就像一個問號，代表貓咪心情很好、很歡迎你。這通常是牠走過來打招呼時的樣子。",
          "如果尾巴用力左右甩動，就表示牠有點煩躁，這時候先讓牠靜一靜比較好。",
        ],
      },
      {
        heading: "耳朵的方向",
        paragraphs: [
          "耳朵朝前，表示貓咪很放鬆或對某樣東西感興趣。",
          "耳朵往後壓平，像飛機翅膀一樣，就代表牠害怕或生氣了，記得不要再靠近。",
        ],
      },
      {
        heading: "慢慢眨眼睛",
        paragraphs: [
          "當貓咪看著你、慢慢地眨一下眼睛，這是牠表達信任和愛的方式，被稱為「貓咪之吻」。",
          "下次牠這樣看你時，也試著慢慢回眨一下吧，牠會懂的。",
        ],
      },
    ],
  },
  {
    slug: "why-cats-sleep-so-much",
    title: "貓咪為什麼一直睡？關於貓咪睡眠的小秘密",
    excerpt: "一天睡上 12 到 16 個小時，貓咪真的是睡覺專家。牠們到底在睡什麼？什麼時候該注意？",
    date: "2026-11-16",
    readMinutes: 3,
    tag: "健康照護",
    cover: "/images/sleepy-cat.jpg",
    coverAlt: "睡得很香的橘貓",
    sections: [
      {
        heading: "天生的獵人需要充電",
        paragraphs: [
          "貓咪的祖先是靠狩獵維生的，捕獵需要短時間爆發大量體力，所以平常就要多睡覺來儲存能量。",
          "即使家裡的貓咪不用自己抓老鼠，這個習慣還是保留了下來。",
        ],
      },
      {
        heading: "很多時候只是在打盹",
        paragraphs: [
          "貓咪的睡眠大多是淺眠，你會發現牠閉著眼睛，耳朵卻還會隨著聲音轉動。一有風吹草動，就能馬上醒來。",
          "真正的熟睡時間其實不長，熟睡時牠可能會把肚子露出來，或是發出小小的夢話和抽動。",
        ],
      },
      {
        heading: "什麼時候要注意？",
        paragraphs: [
          "如果貓咪突然比平常睡得更多、叫也叫不太醒，或是同時出現食慾變差、不喝水等狀況，就可能是身體不舒服。",
          "這時候別猶豫，帶牠去給獸醫檢查最安心。",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}
