      
<template>
    <div class="review-preview-txt">
      <h3>{{ date }}</h3>
      <p>{{ review.content }}</p>
    </div>
    <!-- </el-collapse-item> -->
</template>

<script>
export default {
  props: {
    review: Object,
  },
  computed: {
    date() {
      return new Date(this.review.createdAt).toLocaleDateString("he-IL");
    },
  },
};
</script>