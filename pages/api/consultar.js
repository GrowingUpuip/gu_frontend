import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Define la ruta del archivo dentro de la carpeta `public`
  const filePath = path.join(process.cwd(), "public", "registros.txt");

  // Lee el contenido del archivo
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error al leer el archivo de registros" });
    }

    // Verifica si hay registros
    if (!data.trim()) {
      return res.status(404).json({ error: "No hay registros encontrados" });
    }

    try {
      // Dividir los registros por líneas y mapear
      const registros = data
        .split("\n")
        .map((line) => line.trim().split(","))
        .filter((arr) => arr.length === 3) // Filtrar líneas que no tienen exactamente 3 campos
        .map(([nombre, correo, id_evento]) => ({ nombre, correo, id_evento }));

      res.status(200).json({ registros });
    } catch (error) {
      console.error("Error al procesar registros:", error);
      res
        .status(500)
        .json({ error: "Error al procesar los registros del archivo" });
    }
  });
}
