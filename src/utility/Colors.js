import { union } from 'lodash'

class Colors {
  /*
   * Singleton pattern from https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae
   */

  constructor () {
    // colors from https://medium.com/p/fcd4e707a283/responses/show
    this.COLORS = [
      '#a6cee3',
      '#1f78b4',
      '#b2df8a',
      '#33a02c',
      '#fb9a99',
      '#e31a1c',
      '#fdbf6f',
      '#ff7f00',
      // '#cab2d6',
      '#6a3d9a',
      '#ffff99',
      '#b15928'
    ]
    this.labelColors = {}
  }

  mapColorsToLabels (labels) {
    return labels.map(label => {
      if (!this.labelColors[label]) {
        const firstAvailColor = union(Object.keys(this.labelColors), labels).length - 1 % this.COLORS.length
        this.labelColors[label] = this.COLORS[firstAvailColor]
        return this.COLORS[firstAvailColor]
      }
      return this.labelColors[label]
    })
  }
}

export default new Colors()
