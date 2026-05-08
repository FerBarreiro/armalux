# Contexto tecnol�gico del Proyecto: Sistema Integral "Electricidad Armalux"

## 1. El Negocio y su Dinámica
**Nombre:** Electricidad Armalux  
**Ubicación:** Vicente López, Buenos Aires (Zona Norte GBA). Cobertura en Olivos, Florida, Saavedra y Núñez.  
**Propietario:** Adrián 
**Diseño UI/UX:** Fernanda (sin conocimientos de desarrollo técnico).  

**Unidades de Negocio:**
1. **Venta al mostrador:** Repuestos e insumos eléctricos con uso intensivo de lector de código de barras.
2. **Taller de reparación:** Recepción de electrodomésticos en el local para servicio técnico.
3. **Service a domicilio:** Visitas técnicas de electricidad y reparaciones fuera del local.

## 2. Visión Técnica
El sistema debe ser una **Web App** accesible desde computadoras de escritorio (mostrador) y dispositivos móviles (técnico en calle).  
- **Tecnología sugerida:** Next.js / React para el frontend.
- **Base de Datos / Backend:** Supabase o Firebase (para gestión simplificada de base de datos relacional).

## 3. Módulo de Inventario y Precios
Es el núcleo del sistema para modernizar el flujo de trabajo actual.

### Sistema de Identificación de Artículos
Cada producto deber� tener dos identificadores clave:
- **Código de Proveedor (SKU):** Alfanumérico, proveniente de las listas de los proveedores (ej: Mig-Luz). Inmutable.
- **Código de Barras:** Numérico, asociado manualmente mediante pistola lectora a la etiqueta física del producto. Puede estar vacío si el producto es fraccionado o no tiene etiqueta.

### Lógica de Importación de Listas (Archivos CSV)
El sistema debe manejar dos tipos de archivos basados en el proveedor principal (Mig-Luz):

1. **Catálogo Maestro (Archivo `Listamigluz.xls`):**
   - **Formato:** Saltear las primeras 7 filas (encabezados/metadatos). Los datos reales comienzan en la fila 8.
   - **Columnas:** Marca, Código, Descripción, Lista, Costo, Margen, Venta.
   - **Acción:** Crea los productos en la base de datos.

2. **Actualizador de Precios (Archivo `ORIGEN.xls`):**
   - **Formato:** Sin encabezados.
   - **Columnas:** (Col 2) Código de Proveedor, (Col 3) Nuevo Precio de Costo.
   - **Acción:** Busca por código de proveedor y actualiza **únicamente** el costo. 
   - **Restricción:** No debe borrar ni modificar Descripciones, Marcas ni los Códigos de Barras cargados manualmente.

## 4. Estructura de Datos Relacional (CRM y Servicios)
El sistema debe permitir rastrear quién pidió el servicio y dónde se realizó, entendiendo que múltiples personas pueden vivir en un mismo domicilio.

- **Clientes:** ID, Nombre, DNI, Teléfono, Email.
- **Direcciones:** ID, Calle, Altura, Localidad, Notas de acceso.
- **Relación Cliente-Dirección:** Un cliente puede tener varias direcciones; una dirección puede tener varios clientes asociados.
- **Órdenes de Trabajo:**
  - **Tipo:** Taller (Ingreso de equipo) o Domicilio (Visita técnica).
  - **Vinculación:** Cliente + Dirección + Equipo/Problema.
  - **Estados:** Pendiente, Presupuestado, Reparado, Entregado, Cobrado.
  - **Historial:** Registro de servicios realizados y repuestos utilizados (descontando stock).

## 5. Requerimientos de Interfaz
- **Buscador Universal:** Una barra de búsqueda en el punto de venta que acepte tanto el SKU manual como el disparo del lector de códigos de barras.
- **Filtros de Servicio:** Poder filtrar reparaciones por nombre del cliente, DNI o por la dirección para ver el historial completo de intervenciones en esa vivienda.
- **Simplicidad:** La interfaz debe ser limpia y funcional para un uso rápido en el mostrador.

## 6. Limitaciones Conocidas
- **Facturación:** La impresión de ticket fiscal se abordará en una etapa futura (posible integración con API de AFIP).
- **Extracción de PDF:** Se ha decidido convertir los PDFs de proveedores a Excel/CSV antes de subirlos para asegurar la integridad de los datos.
