import type { Plugin, ResolveFn } from 'vite'
import { parseRequest } from './utils'
import { ayncComponentWrapper } from './asyncComponentWrapper'

const asyncComponentWrapperId = '__asyncComponentWrapperId.js'



export function vitePluginLazyLoad(): Plugin {
  const map = new Map()

  let resolver: any = () => {}
  let count = 0

  return {
    name: 'vite-plugin-lazy-load',
    enforce: 'pre',
    resolveId(id, importer) {
      if (id === asyncComponentWrapperId) 
        return asyncComponentWrapperId
      
      const url = parseRequest(id)

      if (url && url.query && url.query.lazy === '') {
 
        const path = `__plugin_${count}.ts` 

        map.set(path, {
          id,
          importer,
          delay: url.query.delay ? parseInt(url.query.delay) : 0,
          origin: url.origin
        })
        count += 1
        return path
      }
    },
    async load(id: string) {
      if (id === asyncComponentWrapperId) 
        return ayncComponentWrapper
      
      const data = map.get(id)
      if (data) {
        const { id, importer, delay, origin } = data
        const path = await resolver(origin, importer)

        const strLoader = delay 
          ? `
            () => new Promise((r) => setTimeout(async () => import('${path}').then(r), ${delay}))
          `
          : `() => import('${path}')`
        
        return `
          import { AyncComponentWrapper } from '${asyncComponentWrapperId}'
          export default AyncComponentWrapper(${strLoader})
        `
      }


    },
    configResolved(config) {
      resolver = config.createResolver()
    },
  }
}