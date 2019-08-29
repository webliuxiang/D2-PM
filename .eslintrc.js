module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [0],
    "no-spaced-func": 0,//函数调用时 函数名与()之间不能有空格
    "quotes": [0],//引号类型 `` "" ''
    "quote-props": [0],//对象字面量中的属性名是否强制双引号
    "space-before-function-paren": [0],//函数定义时括号前面要不要有空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
