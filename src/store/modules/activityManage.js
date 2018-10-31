
const activity = {
  state: {
    ESinformation:{},
    mapPoint:{}
  },

  mutations: {
    SET_INFORMATION: (state, data) => {
      state.ESinformation = data
    },
    SET_POINT: (state, Point) => {
      state.mapPoint = Point
    },
  },

}

export default activity
