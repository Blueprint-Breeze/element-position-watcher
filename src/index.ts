import throttle from 'lodash/throttle'
import {
  cancelAnimationFrame,
  requestAnimationFrame
} from './requestAnimationFrame'

export interface Position {
  x: number
  y: number
}

export class PositionWatcher {
  lastPosition: Position = this.getPosition()
  animationFrameId?: number | null

  constructor (
    public element: HTMLElement,
    public callback: (newPosition: Position, lastPosition: Position) => void,
    interval = 100
  ) {
    this.element = element
    this.callback = throttle(callback, interval)
  }

  start (): this {
    this.lastPosition = this.getPosition()
    const updatePosition = (): void => {
      const newPosition = this.getPosition()
      this.callback(newPosition, this.lastPosition)
      requestAnimationFrame(updatePosition)
      this.lastPosition = newPosition
    }
    updatePosition()
    return this
  }

  stop (): this {
    if (typeof this.animationFrameId === 'number') {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
    return this
  }

  getPosition (): Position {
    const { x, y } = this.element.getBoundingClientRect()
    return {
      x,
      y
    }
  }
}
