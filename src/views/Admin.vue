<template>
  <div>
    <admin-form />
    <footer-line class="footer" />
  </div>
</template>

<script>
import AdminForm from '../components/AdminForm.vue'
import FooterLine from '../components/FooterLine.vue'
export default {
  components: {
    'AdminForm': AdminForm,
    FooterLine
  }
}
</script>
<style scoped>
  .footer{
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
</style>
