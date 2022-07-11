import { products_model } from './../products';
const products=new products_model;
describe("products_model",():void=>{
    it('should have an index method', () => {
        expect(products.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(products.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(products.create).toBeDefined();
      });
    
      it('should have an update method', () => {
        expect(products.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(products.delete).toBeDefined();
      });
        it("create method should add new product",async()=>{
        const data=await products.create({
            name:"dell",
            price:2000,
            category:"lap"
        });
        expect(data).toEqual({
            id:1,
            name:"dell",
            price:2000,
            category:"lap"
        })
        });
        it("index method should show all products",async()=>{
            const data=await products.index();
            expect(data).toEqual([{
                id:1,
                name:"dell",
                price:2000,
                category:"lap"
            }])
            });
        it("show method should show one product",async()=>{
                const data=await products.show(1);
                expect(data).toEqual({
                    id:1,
                    name:"dell",
                    price:2000,
                    category:"lap"
                });
        });
        it("update method should update product",async()=>{
            const data=await products.update({
                    id:1,
                    name:"hp",
                    price:7000,
                    category:"lap"
            });
            expect(data).toEqual({
                id:1,
                name:"hp",
                price:7000,
                category:"lap"
            });
     });
     it("delete method should delete one product",async()=>{
        await products.delete(1);
        const data=await products.index();
        expect(data).toEqual([]);
     });
});