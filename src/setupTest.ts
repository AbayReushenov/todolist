import { Crypto } from "@peculiar/webcrypto";
import '@testing-library/jest-dom';

// Используем Object.assign для обхода ограничения "readonly"
Object.assign(global, {
  crypto: new Crypto()
});
