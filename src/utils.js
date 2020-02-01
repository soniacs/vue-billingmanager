import Vue from 'vue'

Vue.mixin({
  methods: {
    roundNumber(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100;
    },
    setNewId(objectList) {
      const lastId = objectList.length > 0
        ? objectList[objectList.length - 1].id
        : 0;
      return lastId + 1;
    }
  }
})