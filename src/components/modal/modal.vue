<template>
  <transition name="modal-wrap-2">
    <span class="modal2-center" v-if="modalShow && modalType=='modal2'">
      <span class="modal2-icon" :class="modal2IconClass"></span>
      <span class="modal2-text">
        <slot>
          {{placeHolder}}
        </slot>
      </span>
    </span>
    <div class="modal-wrap" v-if="modalShow && modalType!='modal2'">
      <transition :name="modalType" appear>
        <div class="modal3-right" v-if="modalType == 'modal3' && modalShow">
          <slot></slot>
          <div class="modal-close modal3-close" @click="modalClose">X</div>
        </div>
      </transition>
    </div>
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
    modalType:{
      required: true,
      default: 'modal2'
    }
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
    modalShow: function(){
      if(this.modalType=="modal2"){
      if(this.promptKind == 'uerror') {
        setTimeout(() => {
          this.modalClose();
          window.location.reload();
        }, this.hideTime);
      }else{
        setTimeout(() => {
          this.modalClose();
        }, this.hideTime);
      }
    }
    },
  }
}

</script>
