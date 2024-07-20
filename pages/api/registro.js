import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { nombre, correo, id_evento } = req.body;

  // Define la ruta del archivo dentro de la carpeta `public`
  const filePath = path.join(process.cwd(), "public", "registros.txt");

  // Crea el formato de registro a agregar
  const nuevoRegistro = `${nombre},${correo},${id_evento}\n`;

  // Lee el contenido actual del archivo para verificar duplicados
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      // Si no existe el archivo, sigue adelante
      console.error(err);
      res.status(500).json({ error: "Error al leer el archivo de registros" });
      return;
    }

    // Verifica si ya existe un registro con el mismo correo y evento
    let existeRegistro = false;
    if (data) {
      const registros = data.trim().split("\n");
      for (const registro of registros) {
        const [_, existingCorreo, existingEvento] = registro.split(",");
        if (existingCorreo == correo && existingEvento == id_evento) {
          existeRegistro = true;
          break;
        }
      }
    }

    if (existeRegistro) {
      res
        .status(400)
        .json({ error: "Ya existe un registro con el mismo correo y evento" });
      return;
    }

    // Agrega el nuevo registro al archivo
    fs.appendFile(filePath, nuevoRegistro, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error al escribir en el archivo" });
        return;
      }
      res.status(200).json({ message: "Registro guardado correctamente" });
    });
  });
}
