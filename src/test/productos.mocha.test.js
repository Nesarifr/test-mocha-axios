import supertest from "supertest";
import { expect } from "chai";
import {app} from "../../server.js"

const request = supertest(app);

describe("api Productos test", function (){

    this.afterAll(async()=>{
        console.log("este codigo se ececuta al final de cada prueba");
        await request.delete("/api/productos");
    });


    it("Obtener productos vacios", async function(){
        const response = await request.get("/api/productos");
        expect(response.body).to.eql([]);
        expect(response.status).to.be.equals(200);
    })

    it("Se crea un nuevo producto",async()=>{
        const response = await request.post("/api/productos").send({
            title: "Snitch Dorada",
            price: 500,
            thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-color-2/64/golden-snitch-512.png"
        });
        expect(response.status).to.be.equals(200);
        expect(response.body).to.have.own.property("id");
        expect(response.body.id).to.be.equal(1)
    })

    it("Se un segundo producto",async()=>{
        const response = await request.post("/api/productos").send({
            title: "Snitch dos",
            price: 100,
            thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-color-2/64/golden-snitch-512.png"
        });
        expect(response.status).to.be.equals(200);
        expect(response.body).to.have.own.property("id");
        expect(response.body.id).to.be.equal(2)
    })


    
    it("Obtener todos los productos", async function(){
        const response = await request.get("/api/productos");
        expect(response.body.length).to.eql(2);
        expect(response.status).to.be.equals(200);
    })



    it("Se actualiza un producto",async()=>{
        const id = 1
        const response = await request.put(`/api/productos/${id}`)
        .send({
            title: "Snitch Plateada",
            price: 500000000,
            thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-color-2/64/golden-snitch-512.png"
        }, 1);
        expect(response.status).to.be.equals(200);

        expect(response.body.message).to.be.equals("Se actualizo el elemento solicitado con id:1");
        //se verifica modificacion (no se creo ningun elemento nuevo)
        const responseGet = await request.get("/api/productos");
        expect(responseGet.body.length).to.eql(2);
        //se verifica modificacion
        expect(responseGet.body[0].title).to.be.equals("Snitch Plateada");
        expect(responseGet.body[0].price).to.be.equals(500000000);
    })


    it("Se borra un producto",async()=>{
        const id = 1
        const response = await request.delete(`/api/productos/${id}`)
        
        expect(response.status).to.be.equals(200);
        expect(response.body.message).to.be.equals("Producto eliminado");
        //se verifica modificacion ( la lista tiene un largo de uno)
        const responseGet = await request.get("/api/productos");
        expect(responseGet.body.length).to.eql(1);
        //se verifica que elemento conservado es con id:2
        expect(responseGet.body[0].id).to.be.equals(2);
    })


})

