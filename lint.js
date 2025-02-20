const { execSync } = require('child_process');
const path = require('path');

// 指定文档目录
const docsPath = path.join(__dirname, 'docs');

// 执行 lint 检查
function runLint() {
  console.log('Running markdownlint...');
  try {
    execSync(`pnpm run lint`, { stdio: 'inherit' });
  } catch (err) {
    console.error('Markdownlint found issues!');
    process.exit(1);
  }
}

// 执行 lint fix
function runLintFix() {
  console.log('Running lint:fix...');
  try {
    execSync(`pnpm run lint:fix`, { stdio: 'inherit' });
  } catch (err) {
    console.error('Error running lint:fix!');
    process.exit(1);
  }
}

// 主程序
function main() {
  // 执行 lint 检查
  runLint();

  // 执行 lint 修复
  runLintFix();

  console.log('Linting and fixing complete!');
}

// 运行主程序
main();