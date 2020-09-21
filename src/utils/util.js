import { h } from './history'
import { message } from "antd"
import { JUMP_DELAY } from './config'

function saveSuccess (jump = true, path, state) {
  const history = h.get()
  message.success("操作成功")
  if (jump) {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (path) {
        history.push(path, state)
      } else {
        history.goBack();
      }
    }, JUMP_DELAY)
  }
}

function push (path, state) {
  const history = h.get()
  history.push(path, state)
}

function goBack () {
  const history = h.get()
  history.goBack();
}

function transformTime (old_time) {
  return `${old_time.slice(0,10)} ${old_time.slice(11,19)}`
}

export { saveSuccess, transformTime, goBack, push }
