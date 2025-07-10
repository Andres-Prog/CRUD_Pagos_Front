import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@/types$': '<rootDir>/src/app/types/index',
    '^@/context/(.*)$': '<rootDir>/src/app/context/$1',
  },

  collectCoverage: true, 
  coverageProvider: 'v8',
  coverageDirectory: 'coverage', // La carpeta donde se guardarán los reportes

  // Define de qué archivos queremos medir la cobertura. Es importante excluir
  // archivos de configuración, layouts, páginas principales, tipos, etc.
  // Nos enfocamos en los componentes, servicios y lógica de negocio.
  collectCoverageFrom: [
    'src/app/components/**/*.{ts,tsx}',
    // 'src/app/services/**/*.{ts,tsx}',
    // 'src/app/hooks/**/*.{ts,tsx}',
    '!src/app/**/*.d.ts',
    '!src/app/**/layout.tsx',
    '!src/app/**/page.tsx',
    '!src/app/types/**',
    '!src/app/context/**',
    '!**/__tests__/**', // Excluimos con !
  ],

  // Mínimos de cobertura.
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};

export default createJestConfig(config);