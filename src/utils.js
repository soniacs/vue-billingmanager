import Vue from 'vue'

Vue.mixin({
  methods: {
    roundNumber(number) {
        return Math.round((number + Number.EPSILON) * 100) / 100;
    }
  }
})