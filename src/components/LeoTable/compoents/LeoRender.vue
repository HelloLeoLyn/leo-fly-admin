<script>
export default {
  props: ['value'],
  render: function(createElement) {
    let self = this
    return createElement('input', {
      domProps: {
        value: self.value
      },
      class: {
        'el-input': true
      },
      on: {
        input: function(event) {
          self.$emit('input', event.target.value)
        }
      }
    })
  }
}
</script>
