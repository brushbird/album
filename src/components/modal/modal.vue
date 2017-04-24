<template>
  <transition name="modal-wrap-2">
    <span class="modal2-center" v-if="modalShow">
      <span class="modal2-icon" :class="modal2IconClass"></span>
      <span class="modal2-text">
        <slot>
          {{placeHolder}}
        </slot>
      </span>
    </span>
  </transition>
</template>

<style lang="less" scoped>
  @import "modal.less";
</style>

<script>

export default {
  props: {
    modalShow: {
      required: true,
      default: false
    },
    placeHolder: {
      default: '操作成功'
    },
    promptKind: {
      default: 'success'
    },
    hideTime: {
      default: 2000
    },
  },
  data() {
    return {
     
    }
  },
  methods: {
    modalClose: function() {
      this.$emit('modalClose');
    }
  },
  computed: {
    modal2IconClass: function() {
      return this.promptKind === 'success' ? 'modal2-icon-success' : 'modal2-icon-error';
    },
  },
  watch: {
    modalShow: function(val){
      if(val) {
        setTimeout(() => {
          // this.modalClose();
        }, this.hideTime);
      }
    },
  }
}

</script>
