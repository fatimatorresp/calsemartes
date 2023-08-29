const express = require('express')
const app = express()
const path = require('path')
const port = 3001
app.use(express.json());
//var cookieParser = require('cookie-parser')
const fs = require('fs')
/////////////////////////////////////////////
let productos=[]
productos = JSON.parse( fs.readFileSync('./archivo_productos.json',{encoding:'utf-8',flag:'r'}));

// endpoint de prueba
app.get('/', (req, res) => {
    console.log('entró a /')
    res.send('Hola, mundo!')
})
app.post('/producto', (req, res) => {  //crear
    console.log('entró a post/producto',req.body)
    productos.push(req.body)
    fs.writeFileSync('./archivo_productos.json',JSON.stringify(productos),{encoding:'utf-8',flag:'w'});
    res.send("se creo un producto")
})
app.get('/productos', (req, res) => { //leer
    console.log('entró a /', productos) //muestra en consola
    res.send( productos)//muestra cliente
})
// app.get('/producto1', (req, res) => { //leer
//     console.log('entró a get/1elemento', req.body) //muestra en consola 1 elemento
//     res.send( productos[req.body.indice])//muestra cliente
// })
app.get('/producto/:indice', (req, res) => { //leer
    console.log('entró a get/producto1', productos[req.params.indice]) //muestra en consola 1 elemento
    res.send( productos[req.params.indice])//muestra cliente
})
app.get('/producto', (req, res) => { //leer
    console.log('entró a get/producto2', req.query.indice) //muestra en consola 1 elemento
    res.send( productos[req.query.indice])//muestra cliente
})

app.delete('/producto', (req, res) => { //eliminar
    console.log('entró a delete/eliminar', req.body) //muestra en consola
    productos.splice(req.body.indice,1)
    fs.writeFileSync('./archivo_productos.json',JSON.stringify(productos),{encoding:'utf-8',flag:'w'});
    res.send("se elimino ")//muestra cliente
})
app.get('/eliminar/producto/:indice', (req, res) => { //eliminar
    console.log('entró a eliminarindice', productos[req.params.indice]) //muestra en consola
    productos.splice(req.params.indice,1)
    fs.writeFileSync('./archivo_productos.json',JSON.stringify(productos),{encoding:'utf-8',flag:'w'});
    res.send("se elimino por cliente")//muestra cliente
})
app.get('/eliminar/producto', (req, res) => { //eliminar
    console.log('entró a eliminarindice', req.query.indice) //muestra en consola
    productos.splice(req.query.indice,1)
    fs.writeFileSync('./archivo_productos.json',JSON.stringify(productos),{encoding:'utf-8',flag:'w'});
    res.send("se elimino por cliente por otro metodo")//muestra cliente
})


/////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})