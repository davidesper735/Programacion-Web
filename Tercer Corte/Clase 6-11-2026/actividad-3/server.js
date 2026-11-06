import express from "express";

const app = express();
app.use(express.json());

let productos = [
    { id: 1, nombre: "Teclado", precio: 80000, stock: 10 },
    { id: 2, nombre: "Mouse", precio: 35000, stock: 25 }
];
let siguienteId = 3;

app.get("/productos", (req, res) => {
    res.status(200).json(productos);
});

app.get("/productos/:id", function (req, res) {
    const id = Number(req.params.id);

    let encontrado = null;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            encontrado = productos[i];
        }
    }

    if (encontrado === null) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
    } else {
        res.status(200).json(encontrado);
    }
});

app.listen(3000, () => console.log("Servidor listo"));