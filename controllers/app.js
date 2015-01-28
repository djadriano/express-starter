module.exports = {
  generate_code: function() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
  }
}