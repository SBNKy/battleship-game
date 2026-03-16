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
            }).toThrow("Unable to place the ship in given coords");
        });

        test("should throw an error if ships would cross", () => {
            gameboard.placeShip(ship, 3, 5, true);

            const newShip = new Ship(3);
            expect(() => {
                gameboard.placeShip(newShip, 4, 4, false);
            }).toThrow("Unable to place the ship in given coords");
        });
    });

    describe(".receiveAttack()", () => {
        test("should record a missed shot", () => {
            gameboard.receiveAttack(3, 3);

            expect(gameboard.board[3][3].isAttacked).toBe(true);
        });

        test("should throw an error if attacking the same cell twice", () => {
            gameboard.receiveAttack(3, 3);
            expect(() => {
                gameboard.receiveAttack(3, 3);
            }).toThrow("Cell was already attacked");
        });
    });

    describe("allShipsSunk()", () => {
        test("should return 'false' if there are still floating ships", () => {
            const ship1 = new Ship(3);
            const ship2 = new Ship(5);

            gameboard.placeShip(ship1, 1, 5);
            gameboard.placeShip(ship2, 9, 4, false);

            expect(gameboard.allShipsSunk()).toBe(false);
        });

        test("should return 'true' if all ships are sunk", () => {
            const ship1 = new Ship(1);

            gameboard.placeShip(ship1, 1, 5);
            gameboard.receiveAttack(1, 5);

            expect(gameboard.allShipsSunk()).toBe(true);
        });
    });
});
