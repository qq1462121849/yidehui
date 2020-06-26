  //进阶
  function F(){

  }
  function inhert(Target,Origin){//共有原型继承,
  
    F.prototype=Origin.prototype;
    Target.prototype=new F()
    

}
Father.prototype.lastName="zhang"
function Father(){

}
function Son(){

}
inhert(Son,Father)
let son=new Son()
//执行完毕后不被销毁,会占用内存
//闭包,就是F只用被初始化一次,就永远被保存在内存中不被销毁,坏处是占用了内存,好处是接省了cpu,不用每次都被初始化
//如果需要一个变量执行完成后.不需要被销毁,需要多次使用,且不希望被多次初始化浪费性能,那么可以使用闭包,将这个变量状态进行缓存起来,(那为什么不直接使用全局变量呢)
console.log(son.lastName)
//如果一个变量需要进行状态的缓存,且不希望外部使用,那么我可以将它形成闭包,进行状态的缓存,缺点(内存不被释放,占用内存)(简单说就是私有变量)