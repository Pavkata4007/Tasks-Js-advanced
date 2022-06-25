const { expect } = require('chai');
const { carService } = require('./03. Car service_Resources');

describe('test for carService', () => {
    describe('test the function isItExpensive', () => {
        it('If the value of the param is "Engine" or "Transmission" return a message', () => {
            expect(carService.isItExpensive('Engine')).to.equal('The issue with the car is more severe and it will cost more money');

            expect(carService.isItExpensive('Transmission')).to.equal('The issue with the car is more severe and it will cost more money');
        });

        it('If issue is different than "Engige" or "Transmission" return a message', () => {
            expect(carService.isItExpensive('anotherVariable')).to.equal('The overall price will be a bit cheaper');
        });
    });

    describe('test the function discount', () => {
        it('test if the input is invalid, both have to be numbers', () => {
            expect(() => carService.discount(2, '4')).to.throw('Invalid input');
            expect(() => carService.discount(2, [4])).to.throw('Invalid input');
            expect(() => carService.discount('2', 4)).to.throw('Invalid input');
            expect(() => carService.discount(['2'], 4)).to.throw('Invalid input');
        });

        it('test the percentage of discounts', () => {
            const price = 100;
            const discount = price * 0.15;
            const discount2 =  price * 0.3;
            expect(carService.discount(2, 40)).to.equal('You cannot apply a discount');
            expect(carService.discount(3, price)).to.equal(`Discount applied! You saved ${discount}$`);
            expect(carService.discount(8, price)).to.equal(`Discount applied! You saved ${discount2}$`);
        });

        it('test the function partsToBuy', () => {
            expect(() => carService.partsToBuy([2], '4')).to.throw('Invalid input');
            expect(() => carService.partsToBuy([2], 4)).to.throw('Invalid input');
            expect(() => carService.partsToBuy(2, ['4'])).to.throw('Invalid input');
            expect(() => carService.partsToBuy('2', ['4'])).to.throw('Invalid input');
            expect(() => carService.partsToBuy('2', '4')).to.throw('Invalid input');
            expect(() => carService.partsToBuy(2, 4)).to.throw('Invalid input');
            expect(carService.partsToBuy([], ['2', '3', '4'])).to.equal(0);

            const partsCatalog = [{part: 'blowoff valve', price: 145}, {part: 'part1', price: 100}, {part: 'part2', price: 200}];
            const neededParts = ['part1', 'part2'];
            const result = 300;
            // for (const currentPart of neededParts) {
            //     for (const currentObj of partsCatalog) {
            //         if ( currentObj[currentPart] ) {
            //             result += Number(currentObj.price);
            //         }
            //     }
            // }
            expect(carService.partsToBuy(partsCatalog, neededParts)).to.equal(result);
        });
    });
});