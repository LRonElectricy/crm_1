<template>
  <div class="progress">
    <div
      class="determinate"
      :class="color"
      :style="{ width: width + '%' }"
    ></div>
  </div>
</template>
<script>
export default {
  props:['color','width']
  
};
</script>
