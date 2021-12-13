import { render, screen } from '@testing-library/react';
import AvailableMeals from "./AvailableMeals";

describe('Async component', () => {
    test('renders meals if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {

                    results: [
                        { id: 1, product_name: 'Fish', description: 'Tasty fish', price: 10 }
                    ]
                };
            }
        });
        render(<AvailableMeals />);

        // findAll* returns a promise so used for async components - will wait for HTTP request to succeed
        const meals = await screen.findAllByRole('listitem', {}, {});
        expect(meals.length).toBe(1);
    });

    test('renders error message if request fails', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => {
                return {

                    results: [
                        { id: 1, product_name: 'Fish', description: 'Tasty fish', price: 10 }
                    ]
                };
            }
        });
        render(<AvailableMeals />);

        // findAll* returns a promise so used for async components - will wait for HTTP request to succeed
        const error = await screen.findByText('Something went wrong', { exact: false });
        expect(error).toBeTruthy();
    });

    afterEach(() => {
        jest.resetAllMocks()
    });
});
