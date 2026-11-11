import express from "express";

const app = express();
app.set("json spaces", 2);
app.use(express.json());

let productos = [
    { id: 1, nombre: "Teclado", precio: 80000, stock: 10 },
    { id: 2, nombre: "Mouse", precio: 35000, stock: 25 }
];
let siguienteId = 3;

app.get("/productos", function (req, res) {
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

app.post("/productos", (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || precio === undefined) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    const nuevo = { id: siguienteId++, nombre, precio, stock: 0 };
    productos.push(nuevo);
    res.status(201).json(nuevo);
});

app.delete("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) {
        return res.status(404).json({ error: "No existe" });
    }
    productos.splice(i, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log("Servidor listo"));