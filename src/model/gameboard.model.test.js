import { Gameboard } from "./gameboard.model";
import { Ship } from "./ship.model";
describe("Gameboard", () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test("should create a 10x10 grid", () => {
        expect(gameboard.board).toHaveLength(10);

        gameboard.board.forEach((row) => {
            expect(row).toHaveLength(10);
        });
    });

    test("single cell should contain a proper object", () => {
        const cell = gameboard.board[5][6];

        expect(cell).toEqual({ ship: null, isAttacked: false });
    });

    describe(".placeShip()", () => {
        let ship;

        beforeEach(() => {
            ship = new Ship(3);
        });

        test("should throw an error if 'x' coord is out of bounds", () => {
            expect(() => {
                gameboard.placeShip(ship, 10, 5);
            }).toThrow("You need to provide valid coords");
        });

        test("should throw an error if 'y' coord is out of bounds", () => {
            expect(() => {
                gameboard.placeShip(ship, 3, 10);
            }).toThrow("You need to provide valid coords");
        });

        test("should place the ship at given coords", () => {
            gameboard.placeShip(ship, 3, 5, true);

            expect(gameboard.board[3][5].ship).toBe(ship);
        });

        test("should throw an error if ship already exists at given coords", () => {
            gameboard.placeShip(ship, 3, 5, true);

            const newShip = new Ship(1);
            expect(() => {
                gameboard.placeShip(newShip, 3, 5, true);
            }).toThrow("Cell is already occupied");
        });

        test("should throw an error if ships would cross", () => {
            gameboard.placeShip(ship, 3, 5, true);

            const newShip = new Ship(3);
            expect(() => {
                gameboard.placeShip(newShip, 4, 4, false);
            }).toThrow("Unable to place the ship in given coords");
        });
    });
});
