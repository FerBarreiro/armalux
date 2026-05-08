# Armalux · Buscador de Precios — Instrucciones de configuración y uso

Guía paso a paso para alguien sin conocimientos técnicos.  
Tiempo estimado de configuración inicial: **15 minutos**.

---

## PARTE 1 — Preparar la planilla de Google

### Paso 1: Crear la planilla

1. Abrí [Google Sheets](https://sheets.google.com) y creá una planilla nueva.
2. Renombrala como **"Armalux Precios"** (hacé clic en "Hoja de cálculo sin título" arriba a la izquierda).

### Paso 2: Crear las pestañas necesarias

La planilla necesita **3 pestañas**: `productos`, `proveedores` y `config`.

Por defecto Google crea una pestaña llamada "Hoja 1". Hacé clic derecho sobre ella y elegí **Cambiar nombre** → escribí `productos`.

Para agregar las otras dos:
- Hacé clic en el botón **+** abajo a la izquierda.
- Renombrá la nueva pestaña como `proveedores`.
- Repetí y creá la pestaña `config`.

### Paso 3: Cargar los encabezados de cada pestaña

#### Pestaña `productos`
En la fila 1, escribí estas columnas (una por celda, de izquierda a derecha):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| proveedor | sku | descripcion | marca | codigo_barras | costo | margen | precio_venta | unidad | activo |

#### Pestaña `proveedores`
En la fila 1:

| A | B | C | D | E |
|---|---|---|---|---|
| id | nombre | contacto | notas | activo |

Luego agregá los 4 proveedores en las filas 2 a 5:

| id | nombre | contacto | notas | activo |
|----|--------|----------|-------|--------|
| mig-luz | Mig-Luz | (teléfono) | Proveedor principal | true |
| proveedor-2 | (nombre real) | (teléfono) | | true |
| proveedor-3 | (nombre real) | (teléfono) | | true |
| proveedor-4 | (nombre real) | (teléfono) | | true |

#### Pestaña `config`
En la fila 1:

| A | B |
|---|---|
| clave | valor |

En las filas siguientes:

| clave | valor |
|-------|-------|
| sheet_id | (dejar vacío por ahora) |
| ultima_actualizacion | |
| moneda | $ |

### Paso 4: Publicar la planilla (para que la app pueda leerla)

> ⚠️ Este paso es obligatorio. Sin él, la app no puede descargar los precios.

1. En el menú de Google Sheets, hacé clic en **Archivo → Compartir → Publicar en la web**.
2. En el primer desplegable elegí **"Toda la hoja de cálculo"**.
3. En el segundo elegí **"Valores separados por comas (.csv)"**.
4. Hacé clic en **Publicar** y confirmá.
5. Cerrá esa ventana.

Luego también:
1. Hacé clic en el botón azul **Compartir** (arriba a la derecha).
2. En "Acceso general", cambiá a **"Cualquiera que tenga el vínculo"** con permiso de **Lector**.
3. Hacé clic en **Listo**.

### Paso 5: Copiar el ID de la planilla

Mirá la URL de tu planilla en el navegador. Se ve así:

```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
```

El ID es la parte larga entre `/d/` y `/edit`:
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

Copiá ese ID — lo vas a necesitar en el siguiente paso.

---

## PARTE 2 — Configurar la app

### Paso 6: Abrir la app

1. Buscá el archivo **`index.html`** en tu computadora.
2. Hacé doble clic para abrirlo en Chrome o Firefox.
   - No necesita internet para funcionar (aunque el sync con Google Sheets sí).
   - No hay que instalar nada.

### Paso 7: Ingresar el ID de la planilla

1. En la app, hacé clic en **⚙️ Configuración** (en el menú lateral o en la barra inferior en celular).
2. Pegá el ID que copiaste en el campo **"ID de la planilla de Google"**.
3. Hacé clic en **💾 Guardar**.
4. Hacé clic en **🔗 Probar conexión** para verificar que todo esté bien.
   - Deberías ver: "✅ Conexión exitosa. Se detectaron X productos..."

### Paso 8: Sincronizar los datos

Hacé clic en el botón **🔄 Actualizar** (arriba a la derecha).  
La app va a descargar todos los productos de la planilla y guardarlos localmente.

---

## PARTE 3 — Importar la lista de Mig-Luz

### Flujo A: Importar lista completa (archivo de precios oficial)

Este flujo se usa cuando Mig-Luz te envía el archivo XLS con la lista completa de productos y precios.

1. Andá a **📥 Importar → Mig-Luz · Lista**.
2. Hacé clic en el área de carga (o arrastrá el archivo XLS directamente ahí).
3. Seleccioná el archivo `.xls` o `.xlsx` de Mig-Luz.
4. La app:
   - **Ignora automáticamente las primeras 7 filas** (que son los encabezados de Mig-Luz).
   - Lee desde la fila 8: `Marca | Código | Descripción | Lista | Costo | Margen | Venta`.
   - **Crea** los productos nuevos que no existían.
   - **Actualiza** precio, costo y margen de los que ya existían.
   - **Nunca borra** descripciones, marcas ni códigos de barras que ya tenías cargados.
5. Al terminar verás un resumen: "X nuevos, Y actualizados".

### Flujo B: Actualizar solo costos (archivo ORIGEN.xls)

Este flujo se usa cuando recibís un archivo de actualización de precios (sin encabezados).

1. Andá a **📥 Importar → Mig-Luz · Precios**.
2. Cargá el archivo `ORIGEN.xls`.
3. La app lee la columna 2 (código) y la columna 3 (nuevo costo) y actualiza solo el costo de cada producto. El precio de venta se recalcula automáticamente usando el margen existente.
4. Verás un resumen con cuántos se actualizaron y cuáles no se encontraron.

---

## PARTE 4 — Agregar productos de otros proveedores

### Flujo C: Importar con mapeo de columnas

Si los otros proveedores te mandan sus listas en Excel o CSV:

1. Andá a **📥 Importar → Otros Proveedores**.
2. Elegí el proveedor en el desplegable.
3. Cargá el archivo (CSV, XLS o XLSX).
4. La app intenta detectar automáticamente las columnas. Revisá que el mapeo sea correcto:
   - "Campo SKU / Código" → la columna del archivo con el código del producto.
   - "Descripción" → la columna con el nombre del producto.
   - "Costo" → la columna con el precio de costo.
   - etc.
5. Hacé clic en **✅ Importar con este mapeo**.

### Carga manual de un artículo

Para agregar un producto suelto sin archivo:

1. Andá a **➕ Nuevo Artículo**.
2. Completá los campos:
   - **Proveedor**: elegí de la lista.
   - **SKU**: el código que usa el proveedor.
   - **Código de barras**: podés escribirlo o escanearlo con la pistola (ver Parte 5).
   - **Descripción**: nombre completo del producto.
   - **Costo** y **Margen %**: el precio de venta se calcula solo.
3. Hacé clic en **💾 Guardar artículo**.

---

## PARTE 5 — Usar la pistola lectora de código de barras

La pistola lectora funciona como un teclado: escribe el código y envía la tecla Enter.

### Buscar un producto escaneando

1. Asegurate de estar en la pantalla **🔍 Buscar**.
2. La barra de búsqueda ya tiene el foco (el cursor parpadeante está ahí).
3. Apuntá la pistola al código de barras del producto y disparé.
4. La app recibe el código, busca automáticamente y muestra el resultado.
5. Si hay **un solo resultado exacto**, aparece destacado con borde amarillo.

### Cargar el código de barras de un producto

1. Andá a **➕ Nuevo Artículo**.
2. Hacé clic en el campo **"Código de barras"**.
3. Escaneá el producto con la pistola. El código se escribe solo en ese campo.

> **Tip**: Si la pistola no funciona bien, verificá que esté configurada para enviar Enter al final del código (casi todas lo hacen por defecto).

---

## PARTE 6 — Buscar productos en el mostrador

### Desde la computadora del mostrador

1. Abrí el archivo `index.html` en Chrome.
2. La barra de búsqueda tiene el foco automáticamente.
3. Escribí parte del nombre, SKU o código de barras.
4. Los resultados aparecen en tiempo real mientras escribís.
5. Cada tarjeta muestra:
   - Descripción del producto
   - **Precio de venta** (destacado en amarillo)
   - Proveedor, marca, SKU, código de barras
   - Hacé clic en la tarjeta para ver el precio de costo

### Desde el celular del técnico

1. Guardá el archivo `index.html` en el celular, o abrilo desde una ubicación compartida en la red.
2. La app es completamente responsive: funciona en pantalla chica.
3. La barra de navegación está abajo (Buscar / Proveedores / Importar / Nuevo / Config).

### Filtrar por proveedor

Usá los chips debajo de la barra de búsqueda para ver solo los productos de un proveedor.

---

## PARTE 7 — Mantenimiento

### Actualizar los datos desde Google Sheets

Hacé clic en **🔄 Actualizar** (arriba a la derecha) cada vez que quieras traer los cambios de la planilla.

La app también funciona **sin internet**: usa los últimos datos guardados localmente. La barra inferior muestra cuándo fue la última actualización.

### Exportar los datos a CSV

En **⚙️ Configuración → 📤 Exportar CSV** podés descargar todos los productos en un archivo CSV para hacer backups o trabajar en Excel.

### Mostrar / ocultar costos

- En **⚙️ Configuración** podés activar "Mostrar precios de costo" para que sean visibles por defecto en todos los resultados.
- También podés togglear los costos en el momento desde el botón **👁️ Ver costos** en los resultados de búsqueda.
- O hacé clic sobre cualquier tarjeta de producto para ver/ocultar el costo de ese artículo en particular.

---

## Preguntas frecuentes

**¿Qué pasa si no tengo internet?**  
La app funciona con los últimos datos guardados localmente. La barra inferior muestra un punto amarillo indicando "datos desactualizados".

**¿Se puede usar en varios dispositivos?**  
Sí. Cada dispositivo guarda sus datos localmente. Para tener datos actualizados en todos lados, cada uno debe hacer clic en 🔄 Actualizar.

**¿Cómo cambio el nombre de un proveedor?**  
Por ahora, editá directamente el campo `nombre` en la pestaña `proveedores` de Google Sheets y sincronizá. En la app también podés editar el nombre yendo a la pestaña `proveedores` de la planilla.

**¿Cómo elimino un producto?**  
En Google Sheets, cambiá el campo `activo` a `false` en la fila del producto y luego sincronizá. El producto dejará de aparecer en los resultados.

**¿El costo es visible para los clientes?**  
No. El costo está oculto por defecto. Solo se muestra al hacer clic en la tarjeta, o si activás la opción en Configuración. No hay ningún lugar donde el costo sea público.

**¿Qué hago si el archivo de Mig-Luz cambia de formato?**  
Si Mig-Luz cambia la cantidad de filas de encabezado o el orden de columnas, avisale a quien mantenga el archivo `index.html`. El ajuste es un número en el código (`raw.slice(7)` para saltear filas).
