# 日本の絶景 ― Japan's Fleeting Landscapes

> 公開URL / https://eukarya-biz.github.io/navara-hw-shimatani/

**JA:**
「条件が揃わないと見られない日本の自然の絶景」をテーマにした、3D地図のマップコンテンツです。特定の季節・天候・時刻・天体の位置が重なったときにだけ現れる風景を、時間を動かしながら再現します。3D地図エンジン [Navara](https://github.com/reearth/navara)で制作しました。

**EN:**
A 3D map experience themed around Japan's landscapes that appear only when the conditions align — a specific season, weather, time of day, and celestial position. Move time forward and watch each scene emerge. Built on the [Navara](https://github.com/reearth/navara) globe engine .

## 収録スポット / Spots

| スポット / Spot | 現象 / Phenomenon | 条件 / Conditions | スクリーンショット / Screenshot |
| --- | --- | --- | --- |
| 竹田城跡 ― 天空の雲海 / Takeda Castle Ruins | 雲海 / Sea of clouds | 秋の早朝・放射冷却 / Autumn dawn, radiative cooling | <img width="1430" height="725" alt="雲海" src="https://github.com/user-attachments/assets/17db7f63-aa73-41b8-88b5-0497bc5e14ae" /> |
| 石垣島 ― 満天の星空 / Ishigaki Island | 天の川 / Milky Way | 8月・新月の夜 / August, new-moon night | <img width="1433" height="718" alt="石垣島" src="https://github.com/user-attachments/assets/9a3a00c9-e303-4dc3-b94e-29b5d83d6623" /> |
| 田貫湖 ― ダイヤモンド富士 / Lake Tanuki | ダイヤモンド富士 / Diamond Fuji | 8月頃の日の出 / Sunrise around August | <img width="1431" height="725" alt="ダイヤモンド富士" src="https://github.com/user-attachments/assets/3dbacdab-93f7-49bc-86e4-032002da51a4" /> |

## 特徴 / Features

**JA:**
- 日時に応じて太陽・星の実際の位置と空の色を再現（Navaraの天体・大気シミュレーション）
- 「自動再生」で時刻が進み、絶景が現れる瞬間を再現（例：日の出とともに富士山頂へ太陽が重なる）
- 雲海・水面反射・大気表現など、Navaraの表現力を活用
- 左上のパネルで地点切り替え・時刻調整ができるシンプルなUI

**EN:**
- Real sun/star positions and sky colors driven by date and time (Navara's celestial & atmospheric simulation)
- "Auto-play" advances time so you can watch the moment the scene appears (e.g. the sun aligning with Mt. Fuji's summit at sunrise)
- Uses Navara's sea-of-clouds, water reflection, and atmosphere rendering
- Simple panel (top-left) to switch spots and adjust time

## 使い方 / Usage

**JA:**
- 左上のボタンで3つの地点を切り替え
- スライダーで時刻を微調整、または「自動再生」で時間の移り変わりを再生

**EN:**
- Switch between the three spots with the top-left buttons
- Fine-tune time with the slider, or press "Auto-play" to run time forward

## 技術 / Tech

| 項目 / Item | 内容 / Detail |
| --- | --- |
| 3Dエンジン / 3D engine | [Navara](https://github.com/reearth/navara) (`@navara/three`) |
| 描画 / Rendering | Three.js (WebGL) |
| UI | プレーンなDOM（フレームワークなし） / Plain DOM, no framework |
| ビルド / Build | Vite + TypeScript |

主に使ったNavara API / Key Navara APIs used:
`view.atmosphere.date`（太陽・星の位置）, `StarsDesc`（実データの星空）, `CloudsEffectDesc`（雲海）, `PolygonMaterial`（石垣・水面 `water` + SSR）, `sampleTerrainHeight`（地形高さの実測）, `flyTo` / `setCamera`（カメラ）。

### ビルドについて / Build note

**JA:** 本リポジトリには表示用のビルド済みファイル（`index.html`・`assets/`）とソース（`src/`）を含みます。ビルドには Navara のパッケージ（`@navara/three` ほか）が必要ですが、これは未公開のため本リポジトリには同梱していません。

**EN:** This repository contains the built site (`index.html`, `assets/`) and the source (`src/`). Building requires Navara's packages (`@navara/three` etc.), which are not bundled here as they are not yet publicly released.

## データ・クレジット / Data & Credits

**JA:**
- 地図・地形：国土地理院タイル（全国最新写真シームレス、標高DEM）
- 星の配置：実際の天体カタログ（Navara `StarsDesc`）
- 竹田城跡の石垣・田貫湖の水面のポリゴンは、地図をもとに作成した簡易的な形状です（正確な測量データではありません）

**EN:**
- Basemap & terrain: Geospatial Information Authority of Japan (GSI) tiles (seamless aerial photo, elevation DEM)
- Star positions: real astronomical catalog (Navara `StarsDesc`)
- The Takeda stone-wall and Lake Tanuki water polygons are simplified shapes drawn from maps, not survey data

## 注意 / Notes

**JA:**
- 星空は見やすさのため明るさを強調した理想的なイメージです。
- 水面や石垣などのポリゴンは概略で、地形との高さ合わせには近似が含まれます。

**EN:**
- The starry sky is idealized (brightness enhanced for visibility).
- Water and stone-wall polygons are approximate, including their height alignment to terrain.

## ライセンス / License

Dual-licensed under Apache 2.0 or MIT at your option.
see [LICENSE-APACHE](LICENSE-APACHE) / [LICENSE-MIT](LICENSE-MIT).

**JA:** ベースにしている Navara が Apache-2.0 / MIT のデュアルライセンスのため、それに合わせています。バンドルしている地図データ・3Dエンジンは各自のライセンスに従います。

**EN:** Matches the dual license of Navara, on which this is built. Bundled map data and the 3D engine retain their own licenses.



