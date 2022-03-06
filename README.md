# [Vue3 Typescript ElementPlus][https://www.yuque.com/brolly/hgg6ly/qaa0do]

> @types/node => vite.config.js => path

类型文件：可以通过reference引入，或者使用tsconfig的ttypes引入

```
type test<T> = {
    (): T
}
type test<T> = ()=>T
两种等价；
const fn:test<string> = ()=>{
    return "123
}
```