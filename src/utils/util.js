import { h } from './history'
import { message } from "antd"

function saveSuccess (path, state) {
  const history = h.get()
  message.success("操作成功")
  const timer = setTimeout(() => {
    if (path) {
      history.push(path, state)
    } else {
      history.goBack();
    }
    clearTimeout(timer)
  }, 500)
}

export { saveSuccess }
