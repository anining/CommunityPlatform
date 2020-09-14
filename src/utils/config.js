const DEVELOPER = "Production"
const API_URL = DEVELOPER === "Production" ? "http://192.168.1.36:8000/mng" : "http://192.168.1.36:8000/mng"
const JUMP_DELAY = 500

export { API_URL, DEVELOPER, JUMP_DELAY }
