import Vue from 'vue';

/**
 * 全局注册弱提示
 */
export default {
  install() {
    let timer = null;
    Vue.prototype.$alert = (msg) => {
      let aw = document.getElementById('alertWeek')
      if (aw)
        document.body.removeChild(aw)
      let $alert = document.createElement('div')
      $alert.className = 'week-alert'
      $alert.id = 'alertWeek'
      $alert.innerHTML = msg
      document.body.appendChild($alert)
      document.getElementById('alertWeek').className = 'week-alert alert-show'
      clearTimeout(timer)
      timer = setTimeout(() => {
        document.body.removeChild($alert)
      }, 2000)
    }
  }
}
