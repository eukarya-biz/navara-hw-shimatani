import { defineConfig } from "vite";

// GitHub Pages はサブパス(例: https://eukarya-biz.github.io/リポジトリ名/)で
// 配信されるため、アセットのパスを相対パス("./")にしておく。
// これを入れないと公開時に画面が真っ白になる。
export default defineConfig({
  base: "./",
});
