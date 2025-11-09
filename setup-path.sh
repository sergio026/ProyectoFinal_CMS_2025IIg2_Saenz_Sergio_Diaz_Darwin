#!/bin/bash
# Script para agregar Node.js al PATH en Git Bash

# Agregar Node.js al PATH de la sesión actual
export PATH="$PATH:/c/Program Files/nodejs"

# Verificar que funciona
echo "Verificando instalación de Node.js..."
node --version
npm --version

echo ""
echo "✓ Node.js y npm están ahora disponibles en esta sesión."
echo ""
echo "Para hacer esto permanente, agrega esta línea a tu archivo ~/.bashrc:"
echo "export PATH=\"\$PATH:/c/Program Files/nodejs\""

