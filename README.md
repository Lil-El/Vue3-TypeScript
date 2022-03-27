# [Vue3 Typescript ElementPlus][https://www.yuque.com/brolly/hgg6ly/qaa0do]

> @types/node => vite.config.js => path

1. 类型文件：可以通过reference引入，或者使用tsconfig的types引入

2. 
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

3. setup return 和 setup() 无return
   当template需要大量变量时使用无return；少的话就使用return的方式

4. vuex持久化
   vuex-persistedstate