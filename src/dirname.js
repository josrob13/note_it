import { fileURLToPath } from 'url';
import { dirname } from 'path';

//se exporta el nombre de la dirección URL
export const __dirname = dirname(fileURLToPath(import.meta.url));