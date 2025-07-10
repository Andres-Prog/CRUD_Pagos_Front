import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y .env en el entorno de prueba
  dir: './',
});

// Añade cualquier configuración personalizada de Jest que desees
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // --- CORRECCIÓN ---
  // Esta configuración le dice a Jest cómo resolver los alias de ruta de tu tsconfig.json.
  // Asume que tu alias '@/' apunta a 'src/app/'.
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@/types$': '<rootDir>/src/app/types/index',
    '^@/context/(.*)$': '<rootDir>/src/app/context/$1',
  },
};

// createJestConfig es exportado de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js
export default createJestConfig(config);