
export const ayncComponentWrapper =  `

import { h, ref, getCurrentInstance } from 'vue'

export function AyncComponentWrapper(loader) {
  const isLoading = ref(true)

  let AsyncComponent = null

  let error = null

  loader().then(comp => {
      AsyncComponent = comp.default
      // error = 'My error message'
      isLoading.value = false
  }).catch(err => {
    error = err
    isLoading.value = false
  })

  return (props, ctx) => {

    const parent = getCurrentInstance()


    if (isLoading.value && !AsyncComponent) {
      return ctx.slots.loading?.()
    }

    if(error) {
      return ctx.slots.error?.({error})
    }

    const vnode = h(AsyncComponent, props, parent.vnode.children)

    vnode.ref = parent.vnode.ref
    vnode.ce = parent?.vnode.ce
    delete parent.vnode.ce

    return vnode    
  }
}

`