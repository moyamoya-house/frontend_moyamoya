import { Text, Box, Center } from "@yamada-ui/react";
import {
  Mic,
  Brain,
  Users,
  Lock,
  ChevronRight,
  Volume2,
  Music,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Baloon from "./component/baloon.tsx";
import BaloonTopRight from "./component/baloon-topright.tsx";
import BaloonTopLeft from "./component/baloon-topleft.tsx";
import BaloonBottomRight from "./component/baloon-bottomright.tsx";
import "./css/top.css";

const Top = () => {
  const [useData, setUseData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch("http://127.0.0.1:5000/mypage", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUseData(data);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      {useData ? (
        <Box className="top">
          {/* トップヘッダー */}
          <Box className="gradetion">
            <Baloon></Baloon>
            {/* 心の声左上 */}
            <BaloonTopLeft></BaloonTopLeft>
            {/* 心の声右上 */}
            <BaloonTopRight></BaloonTopRight>
            {/* 心の声左下 */}
            <BaloonBottomRight></BaloonBottomRight>
            {/* タイトル */}
            <Center>
              <Text className="potcom">PotCom</Text>
            </Center>
          </Box>

          {/* スクロール促す */}
          <div className="scrolldown">
            <span>scroll</span>
          </div>

          {/* サイト概要 */}

          <div className="page-container">
            <main className="main">
              {/* Hero Section */}
              <section className="section">
                <div>
                  <div className="hero-grid">
                    <div className="hero-content">
                      <div className="badge">新しいストレス発散のカタチ</div>
                      <div>
                        <h1 className="hero-title">
                          愚痴を吐いて
                          <br />
                          心をスッキリ
                        </h1>
                        <p className="hero-description">
                          PotComは、誰もが安心して愚痴を吐き出せるSNSプラットフォーム。
                          <br />
                          批判や誹謗中傷を気にせず、自分の気持ちを素直に表現できます。
                        </p>
                      </div>

                      <div className="hero-buttons">
                        <button className="btn btn-primary btn-lg btn-with-icon">
                          今すぐ始める
                          <ChevronRight className="icon-sm" />
                        </button>
                        <button className="btn btn-outline btn-lg">
                          詳しく見る
                        </button>
                      </div>
                    </div>

                    <div className="preview-container">
                      <div className="blur-circle-1"></div>
                      <div className="blur-circle-2"></div>
                      <div className="preview-card">
                        <div className="preview-content">
                          <div className="preview-header">
                            <div className="preview-logo">
                              <Sparkles className="preview-logo-icon" />
                            </div>
                            <div>
                              <div className="preview-brand">PotCom</div>
                              <div className="preview-subtitle">愚痴の壺</div>
                            </div>
                          </div>

                          <div className="preview-posts">
                            <div className="post">
                              <p className="post-text">
                                今日も上司に理不尽な仕事を押し付けられた...なんでいつも私ばかり？もう疲れた。
                              </p>
                              <div className="post-time">30分前</div>
                              <div className="post-tag">仕事</div>
                            </div>

                            <div className="post">
                              <p className="post-text">
                                電車でずっとスマホの音漏れしてる人がいて、イライラする。周りに迷惑かけてることに気づかないのかな...
                              </p>
                              <div className="post-time">2時間前</div>
                              <div className="post-tag">日常</div>
                            </div>

                            <div className="ai-advice">
                              <div className="ai-header">
                                <Volume2 className="ai-icon" />
                                <div className="ai-title">AIアドバイス</div>
                              </div>
                              <p className="ai-text">
                                ストレスを感じているようですね。深呼吸をして、好きな音楽を聴いてリラックスしてみませんか？
                              </p>
                            </div>
                          </div>

                          <div className="input-container">
                            <input
                              type="text"
                              placeholder="愚痴を入力してください..."
                              className="input"
                            />
                            <div className="input-actions">
                              <button className="btn btn-ghost btn-sm btn-with-icon">
                                <Mic className="icon-sm" />
                                音声で入力
                              </button>
                              <button className="btn btn-primary btn-sm">
                                投稿する
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Concept Section */}
              <section id="concept" className="section section-muted">
                <div>
                  <div className="section-header">
                    <div className="badge">PotComのコンセプト</div>
                    <div>
                      <h2 className="section-title">
                        誰でもどこでも愚痴を発散できる
                      </h2>
                      <p className="section-description">
                        SNSを利用することで感じるストレスを減らし、安心して発言できる環境を提供することがPotComの目的です。
                        <br />
                        日々の小さな不満や悩みを気軽に吐き出し、少しでも心を軽くできるよう、今後も機能の拡充を図っていきます。
                      </p>
                    </div>
                  </div>

                  <div className="concept-grid">
                    <div className="concept-card">
                      <div className="concept-icon-container">
                        <Lock className="concept-icon" />
                      </div>
                      <h3 className="concept-title">安心・安全</h3>
                      <p className="concept-description">
                        匿名性を保持し、コメント機能を排除することで、批判や誹謗中傷を気にせず自分の気持ちを素直に表現できます。
                      </p>
                    </div>

                    <div className="concept-card">
                      <div className="concept-icon-container">
                        <HeartPulse className="concept-icon" />
                      </div>
                      <h3 className="concept-title">ストレス軽減</h3>
                      <p className="concept-description">
                        愚痴を吐き出すことでストレスを軽減し、AIによる適切なアドバイスで心の健康をサポートします。
                      </p>
                    </div>

                    <div className="concept-card">
                      <div className="concept-icon-container">
                        <Users className="concept-icon" />
                      </div>
                      <h3 className="concept-title">共感と繋がり</h3>
                      <p className="concept-description">
                        同じ悩みを持つ人々とつながり、孤独感を解消。共感し合える仲間との交流で心の支えを得られます。
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section id="features" className="section">
                <div>
                  <div className="section-header">
                    <div className="badge">特徴</div>
                    <div>
                      <h2 className="section-title">PotComの3つの特徴</h2>
                      <p className="section-description">
                        ストレス解消に特化した機能で、あなたの心を軽くします
                      </p>
                    </div>
                  </div>

                  <div className="features-grid">
                    <div className="feature">
                      <div className="feature-content">
                        <div className="feature-badge">特徴 1</div>
                        <h3 className="feature-title">文字オンリーのSNS機能</h3>
                        <p className="feature-description">
                          PotComでは、投稿は文字のみで行い、コメント機能を排除しました。他者からの批判や誹謗中傷を気にせず、自分の気持ちを素直に吐き出すことができます。また、匿名性を保持することで、より安心して利用できる仕組みになっています。
                        </p>
                        <ul className="feature-list">
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            テキストのみの投稿で気軽に愚痴を吐き出せる
                          </li>
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            コメント機能なしで批判を気にせず投稿できる
                          </li>
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            匿名性を保持し安心して利用できる
                          </li>
                        </ul>
                      </div>
                      <div className="feature-preview">
                        <div className="feature-preview-content">
                          <div className="preview-posts">
                            <div className="post">
                              <p className="post-text">
                                今日も上司に理不尽な仕事を押し付けられた...なんでいつも私ばかり？もう疲れた。
                              </p>
                              <div className="post-time">30分前</div>
                              <div className="post-tag">仕事</div>
                            </div>

                            <div className="post">
                              <p className="post-text">
                                電車でずっとスマホの音漏れしてる人がいて、イライラする。周りに迷惑かけてることに気づかないのかな...
                              </p>
                              <div className="post-time">2時間前</div>
                              <div className="post-tag">日常</div>
                            </div>

                            <div className="post">
                              <p className="post-text">
                                友達との約束をドタキャンされた。前々から決まっていたのに...こんなことが続くと信頼関係が崩れるよね。
                              </p>
                              <div className="post-time">5時間前</div>
                              <div className="post-tag">人間関係</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="feature">
                      <div className="feature-preview">
                        <div className="feature-preview-content">
                          <div className="preview-header">
                            <div className="preview-logo">
                              <Mic className="preview-logo-icon" />
                            </div>
                            <div>
                              <div className="preview-brand">感情分析</div>
                              <div className="preview-subtitle">
                                あなたの声から感情を分析します
                              </div>
                            </div>
                          </div>

                          <div className="post">
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-medium">
                                感情分析結果
                              </div>
                              <div className="post-tag">ストレスレベル: 中</div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>怒り</span>
                                <span>65%</span>
                              </div>
                              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="bg-red-500 h-full rounded-full"
                                  style={{ width: "65%" }}
                                ></div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>悲しみ</span>
                                <span>30%</span>
                              </div>
                              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-500 h-full rounded-full"
                                  style={{ width: "30%" }}
                                ></div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>不安</span>
                                <span>45%</span>
                              </div>
                              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="bg-yellow-500 h-full rounded-full"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="ai-advice">
                            <div className="ai-header">
                              <Brain className="ai-icon" />
                              <div className="ai-title">AIアドバイス</div>
                            </div>
                            <p className="ai-text">
                              怒りの感情が強いようです。軽い運動や深呼吸をして気分転換してみましょう。また、お気に入りの音楽を聴くことでストレスを軽減できます。
                            </p>
                            <div className="mt-3 flex gap-2">
                              <button className="btn btn-outline btn-sm btn-with-icon">
                                <Music className="icon-sm" />
                                音楽を再生
                              </button>
                              <button className="btn btn-outline btn-sm btn-with-icon">
                                <HeartPulse className="icon-sm" />
                                リラックス法
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="feature-content">
                        <div className="feature-badge">特徴 2</div>
                        <h3 className="feature-title">
                          感情分析AIと生成AIの活用
                        </h3>
                        <p className="feature-description">
                          PotComは、録音した音声データをAIが解析し、利用者の感情を分析します。その結果をもとに、適切なストレス発散方法を提案します。
                        </p>
                        <ul className="feature-list">
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            落ち込んでいるときには、リラックスできる音楽を推薦
                          </li>
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            怒りが強いときには、アクティブな運動を提案
                          </li>
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            悲しいときには、励ましのメッセージを自動生成
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="feature">
                      <div className="feature-content">
                        <div className="feature-badge">特徴 3</div>
                        <h3 className="feature-title">
                          リアルタイム通信による強化されたチャット機能
                        </h3>
                        <p className="feature-description">
                          個人チャットやグループチャット機能を搭載し、同じ悩みを抱えるユーザー同士が気軽に交流できる場を提供します。
                        </p>
                        <ul className="feature-list">
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            個人チャット：一対一で気軽に相談できる機能
                          </li>
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            グループチャット：共通の悩みを持つ人々が集まり、悩みを共有できるコミュニティ
                          </li>
                          <li className="feature-list-item">
                            <div className="feature-list-icon-container">
                              <ChevronRight className="feature-list-icon" />
                            </div>
                            孤独を感じることなく、気持ちを分かち合える環境
                          </li>
                        </ul>
                      </div>
                      <div className="feature-preview">
                        <div className="feature-preview-content">
                          <div className="preview-header">
                            <div className="preview-logo">
                              <Users className="preview-logo-icon" />
                            </div>
                            <div>
                              <div className="preview-brand">
                                仕事のストレスを共有する会
                              </div>
                              <div className="preview-subtitle">
                                メンバー: 24人
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            <div className="flex gap-2">
                              <div className="author-avatar"></div>
                              <div className="post text-sm max-w-[80%]">
                                <p>
                                  今日も残業確定...もう3日連続だよ。みんなはどう乗り切ってる？
                                </p>
                                <div className="post-time">15:30</div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="ai-advice p-3 rounded-lg text-sm max-w-[80%]">
                                <p>
                                  私も最近残業続きで大変。お風呂にゆっくり浸かって、好きな音楽聴くようにしてる。あとは週末に思いっきり寝るw
                                </p>
                                <div className="post-time">15:32</div>
                              </div>
                              <div className="author-avatar"></div>
                            </div>

                            <div className="flex gap-2">
                              <div className="author-avatar"></div>
                              <div className="post text-sm max-w-[80%]">
                                <p>
                                  僕は通勤中に好きな本を読むようにしてる。あと、ランチタイムは必ず外に出るようにしてリフレッシュしてる。小さな息抜きが大事だよね。
                                </p>
                                <div className="post-time">15:35</div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                              <div className="ai-advice p-3 rounded-lg text-sm max-w-[80%]">
                                <p>
                                  みんなありがとう！参考になります。このグループで愚痴を言い合えるだけでも気持ちが楽になりますね。
                                </p>
                                <div className="post-time">15:40</div>
                              </div>
                              <div className="author-avatar"></div>
                            </div>
                          </div>

                          <div className="input-container">
                            <input
                              type="text"
                              placeholder="メッセージを入力..."
                              className="input"
                            />
                            <div className="input-actions">
                              <button className="btn btn-primary btn-sm">
                                送信
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works */}
              <section id="how-it-works" className="section section-muted">
                <div>
                  <div className="section-header">
                    <div className="badge">使い方</div>
                    <div>
                      <h2 className="section-title">
                        簡単3ステップで始められます
                      </h2>
                      <p className="section-description">
                        PotComは直感的で使いやすいインターフェースを提供し、誰でも簡単に始めることができます。
                      </p>
                    </div>
                  </div>

                  <div className="steps-grid">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h3 className="step-title">アカウント作成</h3>
                        <p className="step-description">
                          メールアドレスまたはSNSアカウントで簡単に登録できます。匿名性を保持するためのニックネームを設定しましょう。
                        </p>
                      </div>
                      <div className="step-line-right"></div>
                    </div>

                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h3 className="step-title">愚痴を投稿</h3>
                        <p className="step-description">
                          テキストや音声で愚痴を投稿。AIが感情を分析し、あなたに合ったストレス発散方法を提案します。
                        </p>
                      </div>
                      <div className="step-line-left"></div>
                      <div className="step-line-right"></div>
                    </div>

                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h3 className="step-title">コミュニティに参加</h3>
                        <p className="step-description">
                          同じ悩みを持つ人々のコミュニティに参加して交流。共感し合うことで心の負担を軽減できます。
                        </p>
                      </div>
                      <div className="step-line-left"></div>
                    </div>
                  </div>

                  <div className="cta-button-container">
                    <button className="btn btn-primary btn-lg cta-button">
                      今すぐ始める
                    </button>
                  </div>
                </div>
              </section>

              {/* Testimonials */}
              <section id="testimonials" className="section">
                <div>
                  <div className="section-header">
                    <div className="badge">ユーザーの声</div>
                    <div>
                      <h2 className="section-title">
                        PotComで心が軽くなった人々
                      </h2>
                      <p className="section-description">
                        実際にPotComを利用している人々の声をご紹介します
                      </p>
                    </div>
                  </div>

                  <div className="testimonials-grid">
                    <div className="testimonial">
                      <div className="testimonial-content">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="star"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="testimonial-text">
                          「他のSNSでは言えないことも、PotComなら安心して投稿できます。AIのアドバイスも的確で、本当に心が軽くなりました。毎日の習慣になっています。」
                        </p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-avatar"></div>
                        <div className="author-info">
                          <p className="author-name">匿名 / 30代女性</p>
                          <p className="author-title">会社員</p>
                        </div>
                      </div>
                    </div>

                    <div className="testimonial">
                      <div className="testimonial-content">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="star"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="testimonial-text">
                          「仕事のストレスを抱えていましたが、PotComで同じ悩みを持つ人たちと交流することで、一人じゃないと感じられるようになりました。心理的な支えになっています。」
                        </p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-avatar"></div>
                        <div className="author-info">
                          <p className="author-name">匿名 / 40代男性</p>
                          <p className="author-title">営業職</p>
                        </div>
                      </div>
                    </div>

                    <div className="testimonial">
                      <div className="testimonial-content">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="star"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="testimonial-text">
                          「音声入力機能が便利で、通勤中に愚痴を吐き出せます。AIの感情分析が驚くほど正確で、自分の感情を客観的に見ることができるようになりました。」
                        </p>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-avatar"></div>
                        <div className="author-info">
                          <p className="author-name">匿名 / 20代女性</p>
                          <p className="author-title">学生</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="section section-primary">
                <div>
                  <div className="section-header">
                    <div className="cta-content">
                      <h2 className="section-title">
                        心のモヤモヤをスッキリ解消しませんか？
                      </h2>
                      <p className="section-description">
                        PotComで愚痴を吐き出し、ストレスから解放されましょう。
                        <br />
                        登録は無料で、わずか1分で完了します。
                      </p>
                    </div>
                    <div className="cta-buttons">
                      <button className="btn btn-secondary btn-lg">
                        無料で登録する
                      </button>
                      <button className="btn btn-outline btn-lg">
                        詳細を見る
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default Top;
