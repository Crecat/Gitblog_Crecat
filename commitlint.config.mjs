module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        '➕ Add-post',
        '➖ Remove-post',
        '🔨 Update-post',
        '⬆️ Upgrade-dependency',
        '🚧 Fix-blog-system',
        '🔧 Upgrade-blog-system'
      ]
    ]
  }
};
