import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    };
  },
  methods: {
    roundNumber(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100;
    },
    setNewId(objectList) {
      const lastId = objectList.length > 0
        ? objectList[objectList.length - 1].id
        : 0;
      return lastId + 1;
    },
    monthStringToObject(monthString) {
      const monthArray = monthString.split(" ")
      return {
        month: parseInt(this.monthNames.indexOf(monthArray[0])),
        year: parseInt(monthArray[1])
      }
    },
    formatMonth(monthIndex, monthYear) {
      return this.monthNames[monthIndex] + ' ' + monthYear
    }
  }
})