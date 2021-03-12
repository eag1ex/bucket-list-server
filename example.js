const {delay} = require('x-utils-es/umd')

Promise.all([delay(1000).then(n=>'hello'),delay(10).then(n=>'world'), delay(1200).then(n=>'and ?')]).then(d=>{

  //const [a,b,c]= Array.from(d).values()
   return {a,b,c} = Array.from(d).values()
}).then(d=>{
    console.log(d)
})