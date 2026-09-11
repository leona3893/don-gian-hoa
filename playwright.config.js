// Cấu hình Playwright. Chạy local:  npm test
// Trên GitHub Actions cùng file này được dùng, chỉ khác biến CI=true.
import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Trên CI: chạy lại 1 lần nếu đỏ (mạng chập chờn), và fail nếu ai lỡ để test.only.
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  // Báo cáo: local mở HTML; CI in ra log dạng GitHub hiểu được (chú thích thẳng vào dòng lỗi).
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'on-failure' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright tự bật server tĩnh trước khi test và tắt sau khi xong.
  webServer: {
    command: `npx serve -l ${PORT} --no-clipboard .`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
