export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'add-post',
        'remove-post',
        'update-post',
        'upgrade-dependency',
        'fix-blog-system',
        'upgrade-blog-system'
      ]
    ]
  }
};
