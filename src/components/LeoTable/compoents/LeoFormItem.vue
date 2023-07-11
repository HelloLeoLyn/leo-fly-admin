<script>
export default {
  props: ['value'],
  render: function(h) {
    return (<ElFormItem label="活动名称"><ElInput value={this.value} onInput={this.handleInput}></ElInput></ElFormItem>)
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    }
  }
}
</script>
