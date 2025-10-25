// fakePreCommit.js
const { execSync } = require('child_process')
asdasdasdasd
try {
  // 1. 获取暂存的文件
  const files = execSync('git diff --cached --name-only', {
    encoding: 'utf-8',
  })
    .split('\n')
    .filter(Boolean)

  // 2. 模拟 lint
  files.forEach(file => {
    if (file.endsWith('.js')) {
      console.log(`检查 ${file} ...`)
      // 假装发现问题
      if (file.includes('bad')) {
        throw new Error(`${file} 不合法！`)
      }
    }
  })

  console.log('检查通过，可以提交 🎉')
} catch (err) {
  console.error('提交失败:', err.message)
  process.exit(1)
}
