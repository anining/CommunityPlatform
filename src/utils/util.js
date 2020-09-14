import { h } from './history'
import { message } from "antd"
import { JUMP_DELAY } from './config'

function saveSuccess (jump, path, state) {
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

export { saveSuccess }
