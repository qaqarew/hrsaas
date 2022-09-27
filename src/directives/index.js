export const imgerror = {

  inserted(el, binding, vnode) {
    // 什么时候去换图片：onerror
    // console.log(el)
    // el：Dom

    // console.log(binding)
    // binding： 当前指令的相关信息

    // console.log(vnode)
    // vnode：虚拟节点
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
