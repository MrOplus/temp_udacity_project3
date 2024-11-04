import { checkUrlRegex } from '../src/frontend/js/validators';
describe('checkUrlRegex', () => {
    test('should return true for valid URL', () => {
        expect(checkUrlRegex('https://www.google.com')).toBe(true);
    });

    test('should return false for invalid URL', () => {
        expect(checkUrlRegex('www.google.com')).toBe(false);
    });
});