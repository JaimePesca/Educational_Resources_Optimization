# Modelos y niveles de esfuerzo

Este repositorio fija en `.claude/settings.json` el modelo y el nivel de esfuerzo que Claude Code usa por defecto:

```json
{
  "model": "claude-opus-5-5",
  "effortLevel": "high"
}
```

## 1. Modelos

| Alias | Nombre completo | Para qué sirve |
|---|---|---|
| `opus` | `claude-opus-5-5` | Tareas complejas: razonamiento profundo, cambios grandes en el código y análisis difíciles. |
| `sonnet` | `claude-sonnet-5` | Uso general: buen equilibrio entre calidad, velocidad y consumo. |
| `haiku` | `claude-haiku-4-5` | Tareas rápidas y simples: consultas cortas, ediciones pequeñas y resúmenes. |
| `fable` | `claude-fable-5-1` | Tareas más exigentes, si tu plan lo incluye. |

**Alias o nombre completo.** El alias `opus` apunta siempre a la última versión de Opus, así que cambia de modelo automáticamente cuando sale una versión nueva. El nombre completo, como `claude-opus-5-5`, deja fija esa versión aunque aparezcan otras más recientes. Este repositorio usa el nombre completo para que todas las personas trabajen con el mismo modelo.

## 2. Niveles de esfuerzo

El nivel de esfuerzo indica cuánto razona el modelo antes de responder.

| Nivel | Cuándo usarlo |
|---|---|
| `low` | Tareas mecánicas y rápidas: renombrar, dar formato o responder preguntas puntuales. |
| `medium` | Trabajo cotidiano de complejidad moderada. |
| `high` | Valor por defecto de este repositorio: tareas que piden un análisis cuidadoso. |
| `xhigh` | Problemas difíciles, como una depuración compleja o el diseño de una arquitectura. |
| `max` | Los problemas más difíciles, cuando la calidad importa más que el tiempo y el consumo. |
| `ultracode` | Tareas grandes que conviene repartir entre varios agentes en paralelo, como auditorías, revisiones exhaustivas o migraciones. |

`ultracode` no es un nivel como los demás: combina el esfuerzo `xhigh` con la orquestación de varios agentes. Se activa con `--effort ultracode` o `/effort ultracode`, pero en `settings.json` no va en `effortLevel`, sino en su propia clave (`"ultracode": true`). Solo está disponible si los workflows están activados y el modelo admite `xhigh`.

> **Advertencia:** los niveles más altos consumen más uso de tu plan y tardan más en responder. Además, no todos los niveles están disponibles en todos los modelos.

## 3. Cómo cambiarlos

### Editando `.claude/settings.json`

Cambia los valores de `model` y `effortLevel` en este archivo. El cambio se aplica a todo el repositorio y a todas las personas que lo usen, a partir de la siguiente sesión.

```json
{
  "model": "sonnet",
  "effortLevel": "medium"
}
```

### Con flags al iniciar una sesión local

Los flags `--model` y `--effort` cambian el modelo y el esfuerzo solo para la sesión que inicias, sin tocar `settings.json`.

```bash
claude --model sonnet
claude --model claude-opus-5-5 --effort xhigh
```

### Con comandos dentro de una sesión

Los comandos `/model` y `/effort` cambian el modelo y el esfuerzo mientras trabajas, sin salir de la sesión. Si los usas sin argumento, abren un selector; al confirmar con Enter, la elección también queda guardada como tu valor por defecto para futuras sesiones (en el caso de `/effort`, para ese modelo).

```text
/model haiku
/effort low
```
