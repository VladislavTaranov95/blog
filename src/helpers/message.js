import { ElMessage } from "element-plus"

export function sendMsg(type, msg) {
  if (type === 'error') {
    ElMessage.error({
      center: true,
      message: msg,
    });
  }
  else if (type === 'success') {
    ElMessage.success({
      center: true,
      message: msg,
    });
  }
}