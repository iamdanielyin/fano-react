export default {
  plugins: [
    ['umi-plugin-dva', {
      immer: true,
      exclude: [
        /^\$/
      ],
    }],
    'umi-plugin-polyfill', 
    [
      'umi-plugin-routes',
      {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//
        ],
      },
    ]
  ],
  proxy: {
    '/api': {
      target: 'https://pre.k11-central-server.wosoft.me',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1'
      }
    }
  }
}
