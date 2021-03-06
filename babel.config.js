module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      { exclude: ["es.array.for-each", "web.dom-collections.for-each"] }
    ]
  ]
};
