module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  importOrder: [
    '^@public/(.*)$',
    '^@consts/(.*)$',
    '^@data/(.*)$',
    '^@utils/(.*)$',
    '^@api/(.*)$',
    '^@core/(.*)$',
    '^@stores/(.*)$',
    '^@components/(.*)$',
    '^@pages/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
